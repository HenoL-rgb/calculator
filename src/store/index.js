import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production'
});
