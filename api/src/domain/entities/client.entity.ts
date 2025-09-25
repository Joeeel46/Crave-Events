import { IUserEntity } from "./user.entity";

export interface IClientEntity extends IUserEntity {
  isBlocked: boolean;
  googleVerified?: boolean;
  fcmToken?:string
}