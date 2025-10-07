import { inject, injectable } from "tsyringe";
import { IAuthController } from "../../../domain/interface/controller/auth/auth-controller.interface";
import { Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { IGenerateOtpUseCase } from "../../../domain/interface/useCase/auth/IGenerateOtpUseCase";
import { IUserExistenceService } from "../../../domain/interface/services/IUserExistenceService";
import { IRegisterUseCase } from "../../../domain/interface/useCase/auth/IRegisterUseCase";
import { signupSchemas, loginSchema } from "../validations/userSignup";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { ILoginUserUseCase } from "../../../domain/interface/useCase/auth/ILoginUserUseCase";
import { IGenerateTokenUseCase } from "../../../domain/interface/useCase/auth/IGenerateTokenUseCase";
import { setAuthCookies } from "../../../shared/utils/cookieHelper";
import { otpMailValidationSchema } from "../validations/otpMailValidationSchema";
import { IVerifyOtpUseCase } from "../../../domain/interface/useCase/auth/IVerifyOtpUseCase";
import { forgotEmailValidationSchema } from "../validations/forgot-password";
import { IForgetPassUseCase } from "../../../domain/interface/useCase/auth/IForgetPassUseCase";
import { IGoogleUseCase } from "../../../domain/interface/useCase/auth/IGoogleAuthUseCase";
import { IBlackListTokenUseCase } from "../../../domain/interface/useCase/auth/IBlacklistTokenUseCase";
import { CustomRequest } from "../../middleware/auth.middleware";
import { IRevokeRefreshTokenUseCase } from "../../../domain/interface/useCase/auth/IRevokeRefreshTokenUseCase";
import { clearAuthCookies } from "../../../shared/utils/cookieHelper";


@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IGenerateTokenUseCase")
    private _generateTokenUseCase: IGenerateTokenUseCase,

    @inject("ILoginUserUseCase")
    private _loginUserUseCase: ILoginUserUseCase,

    @inject("IGenerateOtpUseCase")
    private _generateOtpUseCase: IGenerateOtpUseCase,

    @inject("IRegisterUseCase")
    private _registerUseCase: IRegisterUseCase,

    @inject("IUserExistenceService")
    private _userExistenceService: IUserExistenceService,

    @inject("IVerifyOtpUseCase")
    private _verifyOtpUseCase: IVerifyOtpUseCase,

    @inject("IForgetPasswordUseCase")
    private _forgetPassUseCase: IForgetPassUseCase,

    @inject("IGoogleUseCase")
    private _googleUseCase: IGoogleUseCase,

    @inject("IBlackListTokenUseCase")
    private _blackListTokenUseCase: IBlackListTokenUseCase,

    @inject("IRevokeRefreshTokenUseCase")
    private _revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase,

  ) { }


  //*                  🛠️ User Register

  async register(req: Request, res: Response): Promise<void> {
    try {
      console.log('body', req.body)
      const { role } = req.body as { role: keyof typeof signupSchemas }
      const schema = signupSchemas[role];
      if (!schema) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
        return;
      }
      console.log("before validate", req.body);
      const vaildateData = schema.parse(req.body);
      console.log("validate", vaildateData);
      await this._registerUseCase.execute(vaildateData);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
      });
    } catch (error) {
      console.log("Controller Auth")
      handleErrorResponse(res, error);
    }
  }

  async sendOtpEmail(req: Request, res: Response): Promise<void> {
    console.log("Hello...");
    const { email } = req.body;
    console.log(email)
    try {
      const userExists = await this._userExistenceService.emailExists(email);
      console.log(userExists);
      if (userExists) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: ERROR_MESSAGES.EMAIL_EXISTS,
        });
        return;
      }
      console.log("Hello Email")
      await this._generateOtpUseCase.execute(email);

      res.status(HTTP_STATUS.CREATED).json({
        message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;
      console.log(email, otp);
      const validatedDate = otpMailValidationSchema.parse({ email, otp });
      await this._verifyOtpUseCase.execute(validatedDate);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      console.log("Hello World")
      const data = req.body as LoginUserDTO;
      const validatedData = loginSchema.parse(data);
      console.log("This is validated data", validatedData);
      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
      }
      const user = await this._loginUserUseCase.execute(validatedData);

      if (!user.userId || !user.email || !user.role) {
        throw new Error("User ID,Email, or role is missing");
      }

      const tokens = await this._generateTokenUseCase.execute(
        user.userId as string,
        user.email,
        user.role
      );

      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName
      );
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: {
          ...user,
        }
      })
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  async forgetPassword(req: Request, res: Response): Promise<void> {
    try {
      const values = req.body;

      const validatedDate = forgotEmailValidationSchema.parse(values);
      console.log("THis is validte Data", validatedDate)
      await this._forgetPassUseCase.execute(validatedDate.email, validatedDate.role);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.RESETMAIL_SEND_SUCCESS
      })
    } catch (error) {
      handleErrorResponse(res, error)
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      console.log("kjsd")
      await this._blackListTokenUseCase.execute(
        (req as CustomRequest).user.access_token
      );
      console.log('sdklfjklddd')
      await this._revokeRefreshTokenUseCase.execute(
        (req as CustomRequest).user.refresh_token
      );

      const user = (req as CustomRequest).user;
      console.log(user)
      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;
      clearAuthCookies(res, accessTokenName, refreshTokenName);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
      });
    } catch (error) {
      console.log("errrrrrr")
      handleErrorResponse(res, error);
    }
  }

  async authenticateWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      const { credential, client_id, role } = req.body
      const user = await this._googleUseCase.execute(
        credential,
        client_id,
        role
      )

      if (!user.userId || !user.email || !user.role) {
        throw new Error("User ID, email, or role is missing")
      }

      const tokens = await this._generateTokenUseCase.execute(
        user.userId,
        user.email,
        user.role
      )

      const accessTokenName = `${user.role}_access_token`
      const refreshTokenName = `${user.role}_refresh_token`

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName
      )
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: user,
      })
    } catch (error) {
      handleErrorResponse(res, error)
    }
  }
}


