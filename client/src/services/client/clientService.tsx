import { api } from "@/api/auth.axios"
import { AUTH_ROUTES } from "@/constants/auth.route"
import type { IClient } from "@/types/User"
import type { ILoginData } from "@/types/User"
import type { IAxiosResponse } from "@/types/response"
import { CLIENT_ROUTES } from "@/constants/client.route";
import type { SignupFormData } from "@/types/signup";

interface SingupResponse {
  message: string,
  data?: IClient
}

type CreateAccountParams = {
  formdata: SignupFormData
  otpString: string
}


export const clientSignup = async (values: SignupFormData): Promise<SingupResponse> => {
  try {
    const response = await api.post(AUTH_ROUTES.SEND_OTP, values)
    return response.data
  } catch (error: any) {
    console.error('Signup failed', error)
    throw error.response?.data || "Registration failed";
  }
}



export const clientCreateAccount = async ({ formdata, otpString }: CreateAccountParams): Promise<SingupResponse> => {
  try {
    const response = await api.post(AUTH_ROUTES.SIGNUP, {
      formdata,
      otpString
    })
    return response.data
  } catch (error) {
    console.error('Create account failed', error)
    throw error
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
    return response.data
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