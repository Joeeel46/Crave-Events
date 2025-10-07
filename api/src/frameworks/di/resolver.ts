import {container} from 'tsyringe'
import { DependencyInjection } from '.';
import { AuthController } from '../../interfaceAdapters/controllers/auth/auth.controller';
import { IAuthController } from '../../domain/interface/controller/auth/auth-controller.interface';
import { BlockStatusMiddleware } from '../../interfaceAdapters/middleware/block.status.middleware';

DependencyInjection.registerAll();

//=================== Middleware Resolving =====================

export const blockStatusMiddleware = container.resolve(BlockStatusMiddleware)


export const authController = container.resolve<IAuthController>(AuthController);


