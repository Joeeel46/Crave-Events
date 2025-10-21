import { inject, injectable } from "tsyringe";
import { IUserExistenceService } from "../../domain/interface/services/IUserExistenceService";
import { IClientRepository } from "../../domain/interface/repository/users/client.repository.interface";
import { IVendorRepository } from "../../domain/interface/repository/users/vendor.repository.interface";
import { IAdminRepository } from "../../domain/interface/repository/users/admin.repository.interface";
import { IAdminEntity } from "../../domain/entities/admin.entity";
import { IClientEntity } from "../../domain/entities/client.entity";
import { IVendorEntity } from "../../domain/entities/vendor.entity";

@injectable()
export class UserExistenceService implements IUserExistenceService {
  constructor(
    @inject("IClientRepository") private _clientRepository: IClientRepository,
    @inject('IVendorRepository') private _vendorRepository: IVendorRepository,
    @inject('IAdminRepository') private _adminRepository: IAdminRepository
  ) { }

  async emailExists(
    email: string,
    role?: 'client' | 'vendor' | 'admin'
  ): Promise<{
    exists: boolean;
    user: IClientEntity | IVendorEntity | IAdminEntity | null;
    role: 'client' | 'vendor' | 'admin' | null;
    existsInOtherRole?: boolean;
  }> {
    const repo = role ? this.getRepositoryByRole(role) : null;
    const userInRole = repo ? await repo.findOne({ email }) : null;

    if (role) {
      if (userInRole) {
        return { exists: true, user: userInRole, role };
      }

      const allRoles = ['client', 'vendor', 'admin'] as const;
      type Role = typeof allRoles[number];

      const otherRoles: Role[] = allRoles.filter((r): r is Role => r !== role);

      for (const r of otherRoles) {
        const otherRepo = this.getRepositoryByRole(r);
        const user = await otherRepo.findOne({ email });
        if (user) {
          return { exists: false, existsInOtherRole: true, user, role: r as 'client' | 'vendor' | 'admin' };
        }
      }

      return { exists: false, user: null, role: null };
    }

    const [client, admin, vendor] = await Promise.all([
      this._clientRepository.findOne({ email }),
      this._adminRepository.findOne({ email }),
      this._vendorRepository.findOne({ email }),
    ]);

    if (client) return { exists: true, user: client, role: 'client' };
    if (admin) return { exists: true, user: admin, role: 'admin' };
    if (vendor) return { exists: true, user: vendor, role: 'vendor' };

    return { exists: false, user: null, role: null };
  }

  private getRepositoryByRole(role: 'client' | 'vendor' | 'admin') {
    switch (role) {
      case 'client': return this._clientRepository;
      case 'vendor': return this._vendorRepository;
      case 'admin': return this._adminRepository;
    }
  }

}
