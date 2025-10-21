import { container } from "tsyringe";

import { IBcrypt } from "../security/bcryptInterface";
import { IGenerateOtpUseCase } from "../../domain/interface/useCase/auth/IGenerateOtpUseCase";
import { GenerateOtpUseCase } from "../../useCases/auth/register-strategies/GenerateOtpUseCase";
import { PasswordBcrypt } from "../security/password.bcrypt";
import { IRegisterUseCase } from "../../domain/interface/useCase/auth/IRegisterUseCase";
import { RegisterUseCase } from "../../useCases/auth/registerUserUseCase";
import { ClientRegisterStrategy } from "../../useCases/auth/register-strategies/ClientRegisterStrategy";
import { IGenerateTokenUseCase } from "../../domain/interface/useCase/auth/IGenerateTokenUseCase";
import { GenerateTokenUseCase } from "../../useCases/auth/generateTokenUseCase";
import { ITokenService } from "../../domain/interface/services/ITokenService";
import { JWTService } from "../../interfaceAdapters/services/jwtService";
import { ILoginUserUseCase } from "../../domain/interface/useCase/auth/ILoginUserUseCase";
import { LoginUserUseCase } from "../../useCases/auth/loginUserUseCase";
import { IVerifyOtpUseCase } from "../../domain/interface/useCase/auth/IVerifyOtpUseCase";
import { VerifyOtpUseCase } from "../../useCases/auth/register-strategies/VerifyOtpUseCase";
import { IForgetPassUseCase } from "../../domain/interface/useCase/auth/IForgetPassUseCase";
import { ForgetPasswordUseCase } from "../../useCases/auth/forgetPasswordUseCase";
import { IGoogleUseCase } from "../../domain/interface/useCase/auth/IGoogleAuthUseCase";
import { GoogleUseCase } from "../../useCases/auth/googleUseCase";
import { ISendEmailUseCase } from "../../domain/interface/useCase/common/ISendEmailUseCase";
import { SendEmailUseCase } from "../../useCases/common/sendEmailUseCase";
import { IEmailService } from "../../domain/interface/services/IEmailService";
import { EmailService } from "../../useCases/services/email.service";
import { IRefreshTokenUseCase } from "../../domain/interface/useCase/auth/IRefreshTokenUseCase";
import { RevokeRefreshTokenUseCase } from "../../useCases/auth/revoke-refresh-token.usecase";
import { IRevokeRefreshTokenUseCase } from "../../domain/interface/useCase/auth/IRevokeRefreshTokenUseCase";
import { IBlackListTokenUseCase } from "../../domain/interface/useCase/auth/IBlacklistTokenUseCase";
import { BlackListTokenUseCase } from "../../useCases/auth/blacklist-token.usecase";
import { IResetPasswordUseCase } from "../../domain/interface/useCase/auth/IResetPasswordUseCase";
import { ResetPasswordUseCase } from "../../useCases/auth/reset-password.usecase";


export class UseCaseRegistry {
  static registerUseCase(): void {

    // ======================= Auth ==========================//

    //  container.register<ISendOtpEmailUseCase>("ISendOtpEmailUseCase",{
    //   useClass: sendOtpEmailUseCase
    //  })

    //* ====== Register Strategy ====== *//
    container.register("ClientRegisterStrategy", {
      useClass: ClientRegisterStrategy,
    });

    //==================== Register Services =====================//
    container.register<IGenerateOtpUseCase>("IGenerateOtpUseCase", {
      useClass: GenerateOtpUseCase,
    });

    container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
      useClass: VerifyOtpUseCase,
    });

    container.register<IBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

    container.register<IRegisterUseCase>("IRegisterUseCase", {
      useClass: RegisterUseCase
    });

    container.register<IEmailService>("IEmailService",{
      useClass: EmailService
    })

    container.register<ISendEmailUseCase>("ISendEmailUseCase",{
      useClass: SendEmailUseCase
    })

    container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
      useClass: GenerateTokenUseCase,
    });

    container.register<ITokenService>("ITokenService", {
      useClass: JWTService,
    });

    container.register<ILoginUserUseCase>("ILoginUserUseCase", {
      useClass: LoginUserUseCase,
    });

    container.register<IForgetPassUseCase>("IForgetPasswordUseCase", {
      useClass: ForgetPasswordUseCase,
    });

    container.register<IGoogleUseCase>("IGoogleUseCase", {
      useClass: GoogleUseCase,
    })

    container.register<IRevokeRefreshTokenUseCase>("IRevokeRefreshTokenUseCase", {
      useClass: RevokeRefreshTokenUseCase
    })

    container.register<IBlackListTokenUseCase>("IBlackListTokenUseCase", {
      useClass: BlackListTokenUseCase
    })

    container.register<IResetPasswordUseCase>("IResetPasswordUseCase", {
      useClass: ResetPasswordUseCase
    })
  }
}