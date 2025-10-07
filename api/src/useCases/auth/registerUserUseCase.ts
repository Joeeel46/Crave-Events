import { inject, injectable } from "tsyringe";
import { IRegisterUseCase } from "../../domain/interface/useCase/auth/IRegisterUseCase";
import { UserDTO } from "../../shared/dtos/user.dto";
import { IRegisterStrategy } from "./register-strategies/register-strategy.interface";

@injectable()
export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    @inject("ClientRegisterStrategy")
    private _registerStrategy: IRegisterStrategy
  ) {}

  async execute(user: UserDTO): Promise<void> {
    await this._registerStrategy.register(user);
  }
}
