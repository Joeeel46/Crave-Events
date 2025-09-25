import { api } from "@/api/auth.axios";
import type { ILoginData } from "@/types/User";
import { AUTH_ROUTES } from "@/constants/auth.route";
import { ADMIN_ROUTES } from "@/constants/admin.route";
import type { IAxiosResponse } from "@/types/response";

export const adminLogin = async (user: ILoginData) => {
    try {
        const response = await api.post(AUTH_ROUTES.LOGIN, user)
        return response?.data
    } catch (error: any) {
    throw error.response?.data || "Failed to Login User";
    }
}

export const logoutAdmin = async (): Promise<IAxiosResponse> => {
    try {
        const response = await api.post(ADMIN_ROUTES.LOGOUT);
        return response.data;
    } catch (error: any) {
    throw error.response?.data || "Error while logging out";
  }
};

