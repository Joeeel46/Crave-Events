import { UserDTO } from "../../../../shared/dtos/user.dto";
import { IClientEntity } from "../../../entities/client.entity";

export interface IRegisterUseCase {
    execute(user: UserDTO): Promise<IClientEntity | void>
}