import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../services/utilities';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('authenticated') || null,
  authenticated: false,
  errors: null,
};

export const setSignUpData = createAsyncThunk('user/signup', async (values) => {
  return await request('auth/signup', 'POST', false, values);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      // Destructuring user and tokens from payload
      const { user, access_token } = action.payload;
      state.user = user;
      state.token = access_token;
      state.authenticated = true;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(setSignUpData.fulfilled, (state, action) => {
  //       state.user = action.payload.user;
  //       console.log('suss', action.payload);
  //     })
  //     .addCase(setSignUpData.pending, (state, action) => {
  //       state.user = 'pending';
  //       console.log('pending', action.payload);
  //     })
  //     .addCase(setSignUpData.rejected, (state, action) => {
  //       state.errors = 'unable to login';
  //       console.log('bad error', action.payload);
  //     });
  // },
});

export const selectUser = (state) => state.user.user;
export const selectUserToken = (state) => state.user.token;
export const checklogged = (state) => state.user.authenticated;

export const { setUserCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;
