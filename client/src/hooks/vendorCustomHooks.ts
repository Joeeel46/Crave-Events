
import { logoutVendor, vendorCreateAccount, VendorLogin, vendorSignup } from "@/services/vendor/vendorService";
import type { IVendorData } from "@/types/signup";
import type { ILoginData } from "@/types/User";
import { useMutation } from "@tanstack/react-query";

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

// export const useVendorSignupMutation = () => {
//     return useMutation({
//         mutationFn: async (formData: FormValues) => {
//             return await vendorSignup(formData)
//         }
//     })
// }

// export const useCreateAccountMutation = () => {
//     return useMutation({
//         mutationFn: ({ formdata, otpString }: { formdata: IVendorData; otpString: string }) => vendorCreateAccount({ formdata, otpString })

//     })
// }

// export const useVendorLoginMutation = () => {
//     return useMutation({
//         mutationFn: (user: ILoginData) => VendorLogin(user)
//     })
// }

// export const useLogoutVendor = () => {
//     return useMutation({
//         mutationFn: logoutVendor,
//     });
// };