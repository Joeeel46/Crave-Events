import { adminLogin, logoutAdmin } from "@/services/admin/adminService";
import type { ILoginData } from "@/types/User";
import { useMutation } from "@tanstack/react-query";

export const useAdminLoginMutation = () => {
    return useMutation({
        mutationFn: (user: ILoginData) => adminLogin(user)
    })
}

export const useLogoutAdmin = () => {
    return useMutation({
        mutationFn: logoutAdmin,
    });
};