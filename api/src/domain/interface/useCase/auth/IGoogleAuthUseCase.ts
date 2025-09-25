import { TRole } from "../../../../shared/constants";
import { IClientEntity } from "../../../entities/client.entity";
import { IVendorEntity } from "../../../entities/vendor.entity";

export interface IGoogleUseCase {
    execute(
        credentials:any,
        client_id:any,
        role:TRole
    ):Promise<Partial<IVendorEntity | IClientEntity>>
}