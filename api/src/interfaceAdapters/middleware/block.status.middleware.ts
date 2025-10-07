import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../domain/interface/repository/users/client.repository.interface";
import { IVendorRepository } from "../../domain/interface/repository/users/vendor.repository.interface";
import { IAdminRepository } from "../../domain/interface/repository/users/admin.repository.interface";
import { CustomError } from "../../domain/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { CustomRequest } from "./auth.middleware";
import { NextFunction , Response } from "express";
import { clearAuthCookies } from "../../shared/utils/cookieHelper";
import { IBlackListTokenUseCase } from "../../domain/interface/useCase/auth/IBlacklistTokenUseCase";
import { IRevokeRefreshTokenUseCase } from "../../domain/interface/useCase/auth/IRevokeRefreshTokenUseCase";




@injectable()
export class BlockStatusMiddleware {
    constructor(
      @inject ("IClientRepository")
      private _clientRepository: IClientRepository,

       @inject("IVendorRepository")
        private _vendorRepository: IVendorRepository,

        @inject("IAdminRepository")
        private _adminRepository: IAdminRepository,

        @inject("IBlackListTokenUseCase")
        private _blackListTokenUseCase : IBlackListTokenUseCase,

        @inject("IRevokeRefreshTokenUseCase")
        private _revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase
    ) {}


    private async getUserStatus(userId: string, role: string) {
      const repo =
        {
          client: this._clientRepository,
          vendor: this._vendorRepository,
          admin: this._adminRepository,
        }[role] || null;
  
      if (!repo) {
        throw new CustomError(
          ERROR_MESSAGES.INVALID_ROLE,
          HTTP_STATUS.BAD_REQUEST
        );
      }
  
      const user = await repo.findOne({ userId });
      return user?.status;
    }
    
    checkStatus = async (
      req: CustomRequest,
      res: Response,
      next: NextFunction
    ) => {
      try {
        console.log("entered123")
        if (!req.user) {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            status: "error",
            message: "Unauthorized: No user found in request",
          });
        }
  
        const { userId, role, access_token, refresh_token } = req.user;
        if (!["client", "vendor", "admin"].includes(role)) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: ERROR_MESSAGES.INVALID_ROLE,
          });
        }
  
        const status = await this.getUserStatus(userId, role);
        if (!status) {
          return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: ERROR_MESSAGES.USER_NOT_FOUND,
          });
        }
  
        if (status === "blocked") {
          await Promise.all([
            this._blackListTokenUseCase.execute(access_token),
            this._revokeRefreshTokenUseCase.execute(refresh_token)
          ]);
          clearAuthCookies(
            res,
            `${role}_access_token`,
            `${role}_refresh_token`
          );
  
          return res.status(HTTP_STATUS.FORBIDDEN).json({
            success: false,
            message: "Access denied: Your account has been blocked",
          });
        }
  
        next();
      } catch (error) {
        console.log('errrrorrrrr')
        console.error("Block Status Middleware Error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error while checking blocked status",
        });
      }
    };

}