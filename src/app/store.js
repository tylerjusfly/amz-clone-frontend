import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/users/userSlice';

// Create a store for the whole application

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
