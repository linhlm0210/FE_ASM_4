import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Store token in localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setToken, clearToken, setError, clearError } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
