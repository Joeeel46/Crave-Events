import {container} from 'tsyringe'
import { DependencyInjection } from '.';
import { AuthController } from '../../interfaceAdapters/controllers/auth/auth.controller';

DependencyInjection.registerAll();

console.log("About to resolve AuthController...");
export const authController = container.resolve(AuthController);
console.log("AuthController resolved");