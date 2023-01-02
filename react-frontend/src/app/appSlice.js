import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Auth from "../services/authService";

const initialState = {
  isAuthenticated: false,
  authUser: null,
  status: "idle",
};

export const setAuthAsync = createAsyncThunk("counter/fetchCount", async () => {
  const response = await Auth.fetchAuthUser();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = true;
        state.authUser = action.payload;
      });
  },
});

export const { setIsAuthenticated, setAuthUser } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.authSlice.isAuthenticated;
export default authSlice.reducer;
