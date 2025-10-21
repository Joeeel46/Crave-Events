import { inject, injectable } from "tsyringe";
import { IResetPasswordUseCase } from "../../domain/interface/useCase/auth/IResetPasswordUseCase";
import { ITokenService } from "../../domain/interface/services/ITokenService";
import { CustomError } from "../../domain/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { JwtPayload } from "jsonwebtoken";
import { IClientRepository } from "../../domain/interface/repository/users/client.repository.interface";
import { IVendorRepository } from "../../domain/interface/repository/users/vendor.repository.interface";
import { IBcrypt } from "../../frameworks/security/bcryptInterface";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject("ITokenService")
    private _jwtService: ITokenService,

    @inject("IClientRepository")
    private _clientRepository: IClientRepository,

    @inject("IVendorRepository")
    private _vendorRepository: IVendorRepository,

    @inject("IPasswordBcrypt")
    private _bcrypt: IBcrypt
  ) { }

  async execute(token: string, password: string): Promise<void> {
    // ✅ 1. Verify token
    const verifyToken = this._jwtService.verifyResetToken(token);


    if (!verifyToken) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const { userId, role } = verifyToken as JwtPayload;

    // ✅ 2. Select repository based on role
    const repository =
      role === "client"
        ? this._clientRepository
        : role === "vendor"
          ? this._vendorRepository
          : null;

    if (!repository) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_ROLE,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // ✅ 3. Find user
    const user = await repository.findById(userId);
    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    // ✅ 4. Check if new password is same as old one
    const isSamePassword = await this._bcrypt.compare(password, user.password);
    if (isSamePassword) {
      throw new CustomError(
        ERROR_MESSAGES.PASSWORD_SAME,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // ✅ 5. Hash the new password
    const hashedPassword = await this._bcrypt.hash(password);

    // ✅ 6. Update password in DB
    await repository.update({ _id: userId }, { password: hashedPassword });
  }
}
