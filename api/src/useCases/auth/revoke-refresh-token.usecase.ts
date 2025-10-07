import { inject, injectable } from "tsyringe";
import { IRevokeRefreshTokenUseCase } from "../../domain/interface/useCase/auth/IRevokeRefreshTokenUseCase";
import { IRefreshTokenRepository } from "../../domain/interface/repository/auth/refresh-token-repository.interface";

@injectable()
export class RevokeRefreshTokenUseCase implements IRevokeRefreshTokenUseCase {
    constructor(
        @inject("IRefreshTokenRepository")
        private _refreshTokenRepository: IRefreshTokenRepository
    ) {}

    async execute(token: string): Promise<void> {
        await this._refreshTokenRepository.revokeRefreshToken(token);
    }
}
