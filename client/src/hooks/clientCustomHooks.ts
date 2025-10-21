import { useMutation } from '@tanstack/react-query';
import { clientCreateAccount, clientResendOtp, clientResetPassword, clientForgotPassword, clientGoogleLogin, clientLogin, clientVerifyOtp, clientSignup, logoutClient } from '@/services/client/clientService';
import type { ILoginData } from '@/types/User';
import type { OtpFormData } from '@/types/signup';

// import type { SignupFormData } from "@/types/signup";



export interface CreateAccountPayload {
  name: string
  email: string
  phone: string
  password: string
  role: "client"
}


type loginData = {
  credential: string
  client_id: string,
  role : string
}

export const useClientSignupMutation = () =>{
  return useMutation({
    mutationFn: (value: string) => clientSignup(value),
  })
}

export const useVerifyOtpClientMutation = () => {
  return useMutation({
    mutationFn: (data: OtpFormData) => clientVerifyOtp(data),
  })
}

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateAccountPayload) => clientCreateAccount(payload),
  })
}

export const useResendOtpClientMutaion = () => {
   return useMutation({
     mutationFn: (email: string) => clientResendOtp(email)
   })
}

export const useClientLoginMutation = () =>{
   return useMutation({
     mutationFn: (user:ILoginData) => clientLogin(user)
   })
}

export const useClientGoogleLoginMutation = () =>{
  return useMutation({
    mutationFn: (loginData:loginData) => clientGoogleLogin(loginData)
  })
}

export const useClientForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; role: 'client' | 'vendor' }) =>
      clientForgotPassword(data)
  })
}

export const useClientResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data:{password:string,token:string}) => clientResetPassword(data.password,data.token)
  })
}

export const useLogoutClient = () => {
  return useMutation({
    mutationFn: logoutClient,
  });
};