import { injectable, inject } from "tsyringe";
import { IVendorRepository } from "../../../domain/interface/repository/users/vendor.repository.interface";
import { IClientRepository } from "../../../domain/interface/repository/users/client.repository.interface";
import { IBcrypt } from "../../../frameworks/security/bcryptInterface";
import { IUserExistenceService } from "../../../domain/interface/services/IUserExistenceService";
import { IClientEntity } from "../../../domain/entities/client.entity";
import { IVendorEntity } from "../../../domain/entities/vendor.entity";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { CustomError } from "../../../domain/utils/custom.error";
import { IRegisterStrategy } from "./register-strategy.interface";
import { generateUniqueId } from "../../../frameworks/security/uniqueuid.bcrypt";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants"; 


@injectable()
export class ClientRegisterStrategy implements IRegisterStrategy {
  constructor(
    @inject("IClientRepository")
    private _clientRepository: IClientRepository,
    @inject("IVendorRepository")
    private _vendorRepository: IVendorRepository,
    @inject("IPasswordBcrypt")
    private _passwordBcrypt: IBcrypt,
    @inject("IUserExistenceService")
    private _userExistenceService: IUserExistenceService,
  ) { }

  async register(user: UserDTO): Promise<IClientEntity | void> {
    const { role, email, password } = user as UserDTO;
    const {exists} = await this._userExistenceService.emailExists(email);
    
    if (exists) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }
    const hashedPassword = password
      ? await this._passwordBcrypt.hash(password)
      : null;

    const userId = generateUniqueId(role);

    let repository;
    if (role === "client") {
      repository = this._clientRepository;
    } else if (role === "vendor") {
      repository = this._vendorRepository;
    } else {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_ROLE,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return await repository.save(
      {
        ...user,
        password: hashedPassword ?? "",
        userId: userId
      } as Partial<IClientEntity | IVendorEntity>
    )
  }
}