import { api } from "@/api/auth.axios"
import type { IVendorData } from "@/types/signup"
import type { IVendor } from "@/types/User"
import { AUTH_ROUTES } from "@/constants/auth.route"
import type { ILoginData } from "@/types/User"
import type { IAxiosResponse } from "@/types/response"
import { VENDOR_ROUTES } from "@/constants/vendor.route"
import type { OtpFormData, VerifyOtpResponse } from "@/types/signup"
import type { SignupResponse } from "@/types/signup"
interface SingupResponse {
  message: string,
  data?: IVendor
}

// export const uploadImageCloudinary = async (formdata: FormData) => {
//     try {
//         const response = await clodAxios.post(CLOUDINARY_URL, formdata)
//         return response.data
//     } catch (error) {
//         console.log('error while uploding image', error)
//         throw error
//     }
// }

export const vendorSignup = async (values: string): Promise<SingupResponse> => {
  try {
    console.log(values);
    const response = await api.post(AUTH_ROUTES.SEND_OTP, {email:values})
    return response.data
  } catch (error: any) {
    console.error('Signup failed', error)
    throw error.response?.data || "Registration failed";
  }
}

export const vendorVerifyOtp = async (data: OtpFormData): Promise<VerifyOtpResponse> => {
  try {
    const response = await api.post(AUTH_ROUTES.VERIFY_OTP, data)
    return response.data
  } catch (error: any) {
    console.error("OTP verification failed", error)
    throw error.response?.data || "OTP verification failed"
  }
}

export const vendorCreateAccount = async (payload: IVendorData): Promise<SignupResponse> => {
  try {
    const response = await api.post(AUTH_ROUTES.SIGNUP, payload)
    return response.data
  } catch (error: any) {
    console.error("Create account failed", error)
    throw error.response?.data || "Account creation failed"
  }
}

export const vendorResendOtp = async (email: string) => {
  try {
    const response = await api.post(AUTH_ROUTES.SEND_OTP, { email })
    return response.data
  } catch (error) {
    console.log('error while client resend otp', error)
    throw error
  }
}


export const VendorLogin = async (user: ILoginData) => {
    try {
        const response = await api.post(AUTH_ROUTES.LOGIN, user)
        return response.data
    } catch (error: any) {
        throw error.response?.data || "Failed to Login Vendor";
    }
}

export const logoutVendor = async (): Promise<IAxiosResponse> => {
    try {
        const response = await api.post(VENDOR_ROUTES.LOGOUT);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error while logging out";
    }
};