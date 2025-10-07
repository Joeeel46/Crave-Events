// store/slices/vendor.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Vendor {
  vendorId: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface VendorAuthState {
  vendor: Vendor | null;
  isAuthenticated: boolean;
}

const initialState: VendorAuthState = {
  vendor: null,
  isAuthenticated: false,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendor: (state, action: PayloadAction<Vendor>) => {
      state.vendor = action.payload;
      state.isAuthenticated = true;
    },
    updateVendor: (state, action: PayloadAction<Partial<Vendor>>) => {
      if (state.vendor) {
        state.vendor = { ...state.vendor, ...action.payload };
      }
    },
    clearVendor: (state) => {
      state.vendor = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setVendor, updateVendor, clearVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
