import { inject,injectable } from "tsyringe";
import { IUserExistenceService } from "../../domain/interface/services/IUserExistenceService";
import { IClientRepository } from "../../domain/interface/repository/users/client.repository.interface"; 

@injectable()
export class UserExistenceService implements IUserExistenceService{
    constructor(
        @inject("IClientRepository") private clientRepo:IClientRepository
    ){}

    async emailExists(email: string): Promise<boolean> {
        const user = await this.clientRepo.findByEmail(email);
        console.log(user)
        return !!user
    }
}