import { api } from "@/api/auth.axios"
import { AUTH_ROUTES } from "@/constants/auth.route"
import type { IClient } from "@/types/User"
import type { ILoginData } from "@/types/User"
import type { IAxiosResponse } from "@/types/response"
import { CLIENT_ROUTES } from "@/constants/client.route";
import type { OtpFormData,SignupFormData } from "@/types/signup"
import type { VerifyOtpResponse } from "@/types/signup"
import type { CreateAccountPayload } from "@/hooks/clientCustomHooks"
import type { SignupResponse } from "@/types/signup"
interface SingupResponse {
  message: string,
  data?: IClient
}



export const clientSignup = async (values: string): Promise<SingupResponse> => {
  try {
    console.log(values);
    const response = await api.post(AUTH_ROUTES.SEND_OTP, {email:values})
    return response.data
  } catch (error: any) {
    console.error('Signup failed', error)
    throw error.response?.data || "Registration failed";
  }
}


export const clientVerifyOtp = async (data: OtpFormData): Promise<VerifyOtpResponse> => {
  try {
    const response = await api.post(AUTH_ROUTES.VERIFY_OTP, data)
    return response.data
  } catch (error: any) {
    console.error("OTP verification failed", error)
    throw error.response?.data || "OTP verification failed"
  }
}




export const clientCreateAccount = async (payload: CreateAccountPayload): Promise<SignupResponse> => {
  try {
    const response = await api.post(AUTH_ROUTES.SIGNUP, payload)
    return response.data
  } catch (error: any) {
    console.error("Create account failed", error)
    throw error.response?.data || "Account creation failed"
  }
}

export const clientResendOtp = async (email: string) => {
  try {
    const response = await api.post(AUTH_ROUTES.SEND_OTP, { email })
    return response.data
  } catch (error) {
    console.log('error while client resend otp', error)
    throw error
  }
}





export const clientLogin = async (user: ILoginData) => {
  try {
    const response = await api.post(AUTH_ROUTES.LOGIN, user)
    return response
  } catch (error: any) {
    throw error.response?.data || "Failed to Login User";
  }
}





export const clientGoogleLogin = async ({
  credential,
  client_id,
  role,
}: {
  credential: string,
  client_id: string,
  role: string
}) => {
  try {
    const response = await api.post(
      AUTH_ROUTES.GOOGLE_AUTH,
      {
        credential,
        client_id,
        role
      })
    return response.data
  } catch (error) {
    console.log('error while client google login', error)
    throw error
  }
}




export const clientForgotPassword = async (email: string) => {
  try {
    const response = await api.post(AUTH_ROUTES.FORGOT_PASSWORD, { email })
    return response.data
  } catch (error: any) {
    throw error.response?.data || "Failed to Login User";
  }
}

export const logoutClient = async (): Promise<IAxiosResponse> => {
  try {
    const response = await api.post(CLIENT_ROUTES.LOGOUT);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Error while logging out";
  }
};