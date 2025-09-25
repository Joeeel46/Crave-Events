import { statusTypes, TRole } from "../../shared/constants";

export interface IUserEntity {
    userId: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    image?: string;
    role: TRole;
    status?: statusTypes;
}