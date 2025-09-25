export interface IVendorData {
  name: string;
  email: string;
  idProof?: string;
  password: string;
  phone: string;  
  role?: string;
}

export interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
