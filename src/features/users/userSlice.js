import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../services/utilities';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  user: JSON.parse(localStorage.getItem('amzClone')) || {},
  // user: cookies.get('AMZCOOKIE') || {},
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
      const { user } = action.payload;
      state.user = user;
      state.authenticated = true;
    },
    logOut: (state) => {
      state.user = {};
      state.authenticated = false;
      localStorage.removeItem('amzClone');
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

export const selectUser = (state) => state.user.user.user; //the last user comes from the api
export const selectUserToken = (state) => state.user.user.access_token;
export const checkexpiresIn = (state) => state.user.user.expiresIn;

export const isAuthenticated = (state) => state.user.authenticated;

export const { setUserCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;
