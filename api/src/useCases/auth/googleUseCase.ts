import { inject, injectable } from "tsyringe";
import { IGoogleUseCase } from "../../domain/interface/useCase/auth/IGoogleAuthUseCase";
import { OAuth2Client } from "google-auth-library";
import { IRegisterUseCase } from "../../domain/interface/useCase/auth/IRegisterUseCase";
import { IClientRepository } from "../../domain/interface/repository/users/client.repository.interface";
import { IVendorRepository } from "../../domain/interface/repository/users/vendor.repository.interface";
import { IClientEntity } from "../../domain/entities/client.entity";
import { IVendorEntity } from "../../domain/entities/vendor.entity";
import { ERROR_MESSAGES, HTTP_STATUS, TRole } from "../../shared/constants";
import { CustomError } from "../../domain/utils/custom.error";
import { ClientDTO } from "../../shared/dtos/user.dto";
import { SendEmailUseCase } from "../common/sendEmailUseCase";



@injectable()
export class GoogleUseCase implements IGoogleUseCase {

    private _oAuthClient: OAuth2Client;
    constructor(
        @inject("IRegisterUseCase")
        private _registerUserUseCase: IRegisterUseCase,

        @inject("IClientRepository")
        private _clientRepository: IClientRepository,

        @inject("IVendorRepository")
        private _vendorRepository: IVendorRepository,

        @inject("ISendEmailUseCase")
        private _sendEmailUsecCase: SendEmailUseCase
    ) {
        this._oAuthClient = new OAuth2Client()
    }

    async execute(credential: string, client_id: string, role: TRole): Promise<Partial<IVendorEntity | IClientEntity>> {

        const ticket = await this._oAuthClient.verifyIdToken({
            idToken: credential,
            audience: client_id,
        })

        const payload = ticket.getPayload()
        if (!payload) {
            console.error("No payload returned from Google token verification");
            throw new CustomError(
                ERROR_MESSAGES.INVALID_TOKEN,
                HTTP_STATUS.UNAUTHORIZED
            )
        }

        const googleId = payload.sub
        const email = payload.email
        const profileImage = payload.picture || "";
        const name = payload.given_name || payload.family_name || ""

        if (!email) {
            throw new CustomError(ERROR_MESSAGES.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST)
        }

        let repository;
        if (role === 'client') {
            repository = this._clientRepository
        } else if (role === 'vendor') {
            repository = this._vendorRepository
        } else {
            throw new CustomError(
                ERROR_MESSAGES.INVALID_ROLE,
                HTTP_STATUS.BAD_REQUEST
            )
        }
        const existingUser = await repository.findOne({ email })

        if (existingUser) {
            if (existingUser.status !== "active") {
                throw new CustomError(
                    ERROR_MESSAGES.BLOCKED,
                    HTTP_STATUS.FORBIDDEN
                )
            }
            return existingUser
        }

        if (role === "vendor") {
            throw new CustomError(
                ERROR_MESSAGES.VENDOR_ACCOUNTS_CANNOT_BE_CREATED_USING_GOOGLE,
                HTTP_STATUS.FORBIDDEN
            )
        }

        const userData: ClientDTO = {
            name,
            role,
            email,
            phone: undefined,
            password: undefined,
            googleId,
            profileImage,
            googleVerified: true
        }

        console.log("Creating new client:", userData);
        const newUser = await this._registerUserUseCase.execute(
            userData
        )

        if (!newUser) {
            throw new CustomError(
                "Registration failed",
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            )
        }

        this._sendEmailUsecCase.execute(
            email,
            `Welcome to Crave Events, ${name || "User"}! 🎉`,
            `Hi ${name || "there"}`
        )
        return newUser;
    }

}