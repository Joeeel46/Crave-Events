import { statusTypes, TRole } from "../constants";

export interface AdminDTO {
   userId?:string;
   name?:string;
   email:string;
   password:string;
   role:"admin"
}

export interface LoginUserDTO {
  email: string;
  password?: string;
  role: TRole;
}

export interface ClientDTO {
	userId?: string;
	name: string;
	email: string;
	phone?: string;
	password?: string;
    googleVerified?:boolean;
	googleId?: string;
    profileImage?:string
	role: "client";
}

export interface VendorDTO {
   userID?: string,
   name: string;
   email: string;
   phone?: string;
   password: string
   vendorStatus?: "active" | "pending" | "rejected" | "blocked";
   idProof?: string;
   role:"vendor"
}


export type UserDTO = AdminDTO | ClientDTO |  VendorDTO ;