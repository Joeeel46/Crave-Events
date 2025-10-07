import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Admin {
  adminId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isSuperAdmin?: boolean;
}

interface AdminAuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
}

const initialState: AdminAuthState = {
  admin: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    updateAdmin: (state, action: PayloadAction<Partial<Admin>>) => {
      if (state.admin) {
        state.admin = { ...state.admin, ...action.payload };
      }
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, updateAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
