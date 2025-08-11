// src/app/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Register user (NO localStorage saving)
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      // ❌ DO NOT store userInfo on register
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Login user (store in localStorage)
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // ✅ Save to localStorage on login only
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Load from localStorage
const storedUser = localStorage.getItem('userInfo');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: storedUser ? JSON.parse(storedUser) : null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.error = null;
      localStorage.removeItem('userInfo');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        // Don't update userInfo on register
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
