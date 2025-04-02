import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleUser = createAsyncThunk(
  'user/fetchSingleUser',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:5000/revonn/users/single-user');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
