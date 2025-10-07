import { inject, injectable } from "tsyringe";
import { IUserExistenceService } from "../../domain/interface/services/IUserExistenceService";
import { IClientRepository } from "../../domain/interface/repository/users/client.repository.interface";
import { IVendorRepository } from "../../domain/interface/repository/users/vendor.repository.interface";
import { IAdminRepository } from "../../domain/interface/repository/users/admin.repository.interface";


@injectable()
export class UserExistenceService implements IUserExistenceService {
    constructor(
        @inject("IClientRepository") private _clientRepository: IClientRepository,
        @inject('IVendorRepository') private _vendorRepository: IVendorRepository,
        @inject('IAdminRepository') private _adminRepository: IAdminRepository
    ) { }

    async emailExists(email: string): Promise<boolean> {
        const [client, admin, vendor] = await Promise.all([
            this._clientRepository.findOne({ email }),
            this._adminRepository.findOne({ email }),
            this._vendorRepository.findOne({ email }),
        ]);

        return !!(client || admin || vendor);
    }
}
