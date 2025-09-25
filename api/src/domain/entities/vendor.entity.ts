import { IUserEntity } from "./user.entity";

export interface IVendorEntity extends IUserEntity {
    aboutVendor?: string;
    isBlocked: boolean;
    googleVerified?: boolean;
    isVerified: boolean;
    idProof: string;
}
