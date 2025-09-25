import { injectable } from "tsyringe";
import { AdminModel, IAdminModel } from "../../../frameworks/database/models/admin.model"; 
import { BaseRepository } from "../base.repository";



@injectable()
export class AdminRepository extends BaseRepository<IAdminModel>{
    constructor(){
       super(AdminModel)
    }
}