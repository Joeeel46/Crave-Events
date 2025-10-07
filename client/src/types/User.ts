

type statusTypes = "active" | "pending" | "blocked";

export type ForType = "active" | "non-active" | "all" | "pending";

export type UserRoles = "admin" | "vendor" | "client";

export type UserType = "client" | "vendor";

export interface ILoginData {
	email: string;
	password: string;
	role: UserRoles;	
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface User{
	_id?:string
	userId?: string
	name:string,
	email:string,
	phone:string,
	password?:string,
	role?:UserRoles,
	status?:statusTypes,
	profileImage?:string
	createdAt?:Date,
	lastLogin?:Date,
	updatedAt?:Date,
	onlineStatus?:'online'|'offline',
	isAdmin?:boolean
}


export interface IAdmin extends User {
  isSuperAdmin?: boolean;
}



export interface IClient extends User{
	userId?:string,
	googleVerified?:boolean
}


export interface IVendor extends User{
	idProof?: string,
	vendorId?: string,
	rating?:number,
	category?:string,
	vendorStatus?:'pending'| 'approved' | 'rejected'
	rejectionReason?:string,
	aboutVendor?:string
}



export type UserDTO = IAdmin | IClient | IVendor




export interface IFetchUsersParams {
	userType: UserType
	page: number;
	limit: number;
	search: string;
}


export interface IFetchVendorParams {
	forType: ForType;
	page: number;
	limit: number;
	search: string;
}