import 'reflect-metadata';
import { container } from 'tsyringe';


import { IOtpService } from '../../domain/interface/services/IOtpService';
import { OtpService } from '../../interfaceAdapters/services/OtpService';
import { IRedisClient } from '../../domain/interface/services/IRedisClient';
import { RedisClient } from '../redis/redisClient';
import { INodemailerService } from '../../domain/interface/services/INodeMailerService';
import { NodemailerService } from '../../interfaceAdapters/services/NodemailerService';
import { IUserExistenceService } from '../../domain/interface/services/IUserExistenceService';
import { IVendorRepository } from '../../domain/interface/repository/users/vendor.repository.interface';
import { ClientRepository } from '../../interfaceAdapters/repository/users/client.repository';
import { IClientRepository } from '../../domain/interface/repository/users/client.repository.interface';
import { VendorRepository } from '../../interfaceAdapters/repository/users/vendor.repository';
import { UserExistenceService } from '../../interfaceAdapters/services/UserExistenceService';
import { IRefreshTokenRepository } from '../../domain/interface/repository/auth/refresh-token-repository.interface';
import { RefreshTokenRepository } from '../../interfaceAdapters/repository/auth/refreshTokenRepository';
import { IAdminRepository } from '../../domain/interface/repository/users/admin.repository.interface';
import { AdminRepository } from '../../interfaceAdapters/repository/users/admin.repository';
import { IRedisTokenRepository } from '../../domain/interface/repository/redis/IRedisTokenRepository';
import { RedisTokenRepository } from '../../interfaceAdapters/repository/redis/redis-token';




export class RepositoryRegistry {
  static registerRepositories(): void {

    container.register<INodemailerService>("INodemailerService", {
      useClass: NodemailerService,
    });

    container.register<IOtpService>("IOtpService", {
      useClass: OtpService,
    });

    container.register<IRedisClient>("IRedisClient", {
      useClass: RedisClient,
    });

    container.register<IClientRepository>("IClientRepository", {
      useClass: ClientRepository,
    });

    container.register<IVendorRepository>("IVendorRepository", {
      useClass: VendorRepository,
    });

    container.register<IUserExistenceService>("IUserExistenceService", {
      useClass: UserExistenceService,
    });

    container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
      useClass: RefreshTokenRepository,
    });

    container.register<IAdminRepository>("IAdminRepository", {
      useClass: AdminRepository
    });

    container.register<IRedisTokenRepository>("IRedisTokenRepository", {
      useClass: RedisTokenRepository,
    });
  }
}