import { inject, injectable } from "tsyringe";
import { LoginUserDTO } from "../../shared/dtos/user.dto";
import { IVendorEntity } from "../../domain/entities/vendor.entity";
import { IAdminEntity } from "../../domain/entities/admin.entity";
import { IClientEntity } from "../../domain/entities/client.entity";
import { IBcrypt } from "../../frameworks/security/bcryptInterface";
import { IVendorRepository } from "../../domain/interface/repository/users/vendor.repository.interface";
import { IClientRepository } from "../../domain/interface/repository/users/client.repository.interface";
import { ILoginUserUseCase } from "../../domain/interface/useCase/auth/ILoginUserUseCase";
import { IAdminRepository } from "../../domain/interface/repository/users/admin.repository.interface";
import { CustomError } from "../../domain/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject("IClientRepository")
    private _clientRepository: IClientRepository,
    @inject("IVendorRepository")
    private _vendorRepository: IVendorRepository,
    @inject("IAdminRepository")
    private _adminRepository: IAdminRepository,
    @inject("IPasswordBcrypt")
    private _passwordBcrypt: IBcrypt
  ) { }

  async execute(
    user: LoginUserDTO
  ): Promise<Partial<IVendorEntity | IAdminEntity | IClientEntity>> {
    let repository;

    if (user.role === "client") {
      repository = this._clientRepository;
    } else if (user.role === "vendor") {
      repository = this._vendorRepository;
    } else if (user.role === "admin") {
      repository = this._adminRepository;
    } else {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_ROLE,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const userData = await repository.findOne({ email: user.email });
    if (!userData) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (userData.status === "pending") {
      throw new CustomError(
        ERROR_MESSAGES.ACCOUNT_UNDER_VERIFICATION,
        HTTP_STATUS.FORBIDDEN
      );
    }

    if (userData.status === "blocked") {
      throw new CustomError(
        ERROR_MESSAGES.BLOCKED,
        HTTP_STATUS.FORBIDDEN
      );
    }

    if (userData.status === "rejected") {
      throw new CustomError(
        ERROR_MESSAGES.REJECTED,
        HTTP_STATUS.FORBIDDEN
      );
    }


    if (user.password) {
      const isPasswordMatch = await this._passwordBcrypt.compare(
        user.password,
        userData.password
      );
      if (!isPasswordMatch) {
        throw new CustomError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          HTTP_STATUS.FORBIDDEN
        );
      }
    }

    return userData;
  }
}
