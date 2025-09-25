import { useMutation } from '@tanstack/react-query';
import { clientCreateAccount, clientForgotPassword, clientGoogleLogin, clientLogin, clientResendOtp, clientSignup, logoutClient } from '@/services/client/clientService';
import type { ILoginData } from '@/types/User';

import type { SignupFormData } from "@/types/signup";

type loginData = {
  credential: string
  client_id: string,
  role : string
}



export const useClientSignupMutation = () =>{
  return useMutation({
    mutationFn: (values: SignupFormData) => clientSignup(values),
  })
}

export const useCreateAccountMutation = () => {
  return useMutation({
      mutationFn: ({ formdata, otpString }: { formdata: SignupFormData; otpString: string }) => clientCreateAccount({ formdata, otpString })
  })
}

// export const useClientLoginMutation = () =>{
//    return useMutation({
//      mutationFn: (user:ILoginData) => clientLogin(user)
//    })
// }

// export const useClientGoogleLoginMutation = () =>{
//   return useMutation({
//     mutationFn: (loginData:loginData) => clientGoogleLogin(loginData)
//   })
// }

// export const useClientForgotPasswordMutation = () => {
//   return useMutation({
//     mutationFn: (email:string) => clientForgotPassword(email)
//   })
// }

// export const useResendOtpClientMutaion = () => {
//    return useMutation({
//      mutationFn: (email: string) => clientResendOtp(email)
//    })
// }

// export const useLogoutClient = () => {
//   return useMutation({
//     mutationFn: logoutClient,
//   });
// };