import { injectable } from "tsyringe";
import { IBaseRepository } from "../base-repository.interface";
import { IVendorEntity } from "../../../entities/vendor.entity";



export interface IVendorRepository extends IBaseRepository<IVendorEntity>{
   updateFcmToken(userId: string, token: string): Promise<void>;
   clearFcmToken(userId: string): Promise<void>;
   vendorSave(data:IVendorEntity):Promise<void>
   VendorfindOne(userId:string ):Promise<IVendorEntity | null>
}