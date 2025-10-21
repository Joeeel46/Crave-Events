import { IAdminEntity } from "../../entities/admin.entity";
import { IClientEntity } from "../../entities/client.entity";
import { IVendorEntity } from "../../entities/vendor.entity";

export interface IUserExistenceService {
   emailExists(
      email: string,
      role?: 'client' | 'vendor' | 'admin'
   ): Promise<{
      exists: boolean;
      user: IClientEntity | IVendorEntity | IAdminEntity | null;
      role: 'client' | 'vendor' | 'admin' | null;
      existsInOtherRole?: boolean;
   }>;
}


