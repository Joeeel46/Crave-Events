import { LoginUserDTO } from "../../../../shared/dtos/user.dto";
import { IVendorEntity } from "../../../entities/vendor.entity";
import { IAdminEntity } from "../../../entities/admin.entity";
import { IClientEntity } from "../../../entities/client.entity";

export interface ILoginUserUseCase{
    execute (user:LoginUserDTO):Promise<Partial<IVendorEntity | IAdminEntity | IClientEntity>>;
}