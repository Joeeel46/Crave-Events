import { inject, injectable } from "tsyringe";
import { IBlackListTokenUseCase } from "../../domain/interface/useCase/auth/IBlacklistTokenUseCase";
import { JwtPayload } from "jsonwebtoken";
import { ITokenService } from "../../domain/interface/services/ITokenService";
import { IRedisTokenRepository } from "../../domain/interface/repository/redis/IRedisTokenRepository";
import { CustomError } from "../../domain/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";





@injectable()
export class BlackListTokenUseCase implements IBlackListTokenUseCase {
  constructor(
    @inject("ITokenService") 
    private _tokenService: ITokenService,

    @inject("IRedisTokenRepository")
    private _redisTokenRepository: IRedisTokenRepository

  ) { }

  async execute(token: string): Promise<void> {
    const decode: string | JwtPayload | null =
      this._tokenService.verifyAccessToken(token);
    if (!decode || typeof decode === "string" || !decode.exp) {
      throw new CustomError(ERROR_MESSAGES.TOKEN_EXPIRED, HTTP_STATUS.BAD_REQUEST)
    }

    const expiresIn = decode.exp - Math.floor(Date.now() / 1000);
    if (expiresIn > 0) {
      await this._redisTokenRepository.blackListToken(token, expiresIn)
    }
  }
}