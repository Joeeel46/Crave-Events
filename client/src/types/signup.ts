export interface IVendorData {
  name: string;
  email: string;
  idProof?: string;
  password: string;
  phone: string;  
  role: 'vendor'
}

export interface IClientData {
  name:string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: "client"
}

export interface OtpFormData {
  email: string
  otp: string
}

export interface VerifyOtpResponse {
  success: boolean
  message: string
}

export interface SignupResponse {
  success: boolean
  message: string
}