import { api } from "@/api/auth.axios"
import type { IVendorData } from "@/types/signup"
import { AUTH_ROUTES } from "@/constants/auth.route"
import type { ILoginData } from "@/types/User"
import type { IAxiosResponse } from "@/types/response"
import { VENDOR_ROUTES } from "@/constants/vendor.route"


// export const uploadImageCloudinary = async (formdata: FormData) => {
//     try {
//         const response = await clodAxios.post(CLOUDINARY_URL, formdata)
//         return response.data
//     } catch (error) {
//         console.log('error while uploding image', error)
//         throw error
//     }
// }

export const vendorSignup = async (formdata: IVendorData) => {
    try {
        const response = await api.post(AUTH_ROUTES.SEND_OTP, formdata)
        return response.data
    } catch (error: any) {
        console.error('Signup failed', error)
        throw error.response?.data || "Registration failed";
    }
}


export const vendorCreateAccount = async ({ formdata, otpString }: { formdata: IVendorData; otpString: string }) => {
    try {
        const response = await api.post(AUTH_ROUTES.SIGNUP, { formdata, otpString })
        return response.data
    } catch (error) {
        console.log(error)
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