
import { logoutVendor,vendorVerifyOtp, vendorResendOtp, vendorCreateAccount, VendorLogin, vendorSignup } from "@/services/vendor/vendorService";
import type { IVendorData } from "@/types/signup";
import type { ILoginData } from "@/types/User";
import { useMutation } from "@tanstack/react-query";
import type { OtpFormData } from "@/types/signup";

export interface CreateAccountPayload {
  name: string
  email: string
  phone: string
  password: string
  idProof: string
  role: "vendor"
}

interface FormValues {
    name: string
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    idProof: string;
}


// export const useUploadeImageToCloudinaryMutation = () => {
//     return useMutation({
//         mutationFn: async (formData: FormData) => {
//             return await uploadImageCloudinary(formData)

//         },
//     })
// }

export const useVendorSignupMutation = () => {
    return useMutation({
        mutationFn: (value: string) => vendorSignup(value),
      })
}

export const useVerifyOtpVendorMutation = () => {
  return useMutation({
    mutationFn: (data: OtpFormData) => vendorVerifyOtp(data),
  })
}

export const useVendorCreateAccountMutation = () => {
    return useMutation({
        mutationFn: (payload: IVendorData) => vendorCreateAccount(payload),
      })
}




export const useResendOtpVendorMutaion = () => {
   return useMutation({
     mutationFn: (email: string) => vendorResendOtp(email)
   })
}

export const useVendorLoginMutation = () => {
    return useMutation({
        mutationFn: (user: ILoginData) => VendorLogin(user)
    })
}

export const useLogoutVendor = () => {
    return useMutation({
        mutationFn: logoutVendor,
    });
};