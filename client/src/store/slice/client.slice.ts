import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Client {
  clientId: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface ClientAuthState {
  client: Client | null;
  isAuthenticated: boolean;
}

const initialState: ClientAuthState = {
  client: null,
  isAuthenticated: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<Client>) => {
      state.client = action.payload;
      state.isAuthenticated = true;
    },
    updateClient: (state, action: PayloadAction<Partial<Client>>) => {
      if (state.client) {
        state.client = { ...state.client, ...action.payload };
      }
    },
    clearClient: (state) => {
      state.client = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setClient, updateClient, clearClient } = clientSlice.actions;
export default clientSlice.reducer;
