import { LoginUserDTO } from "../../../../shared/dtos/user.dto";
import { IUserEntity } from "../../../entities/user.entity";

export interface ILoginUserUseCase{
    execute (user:LoginUserDTO):Promise<Partial<IUserEntity>>
}