import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertSlice from './slices/alertSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import productsSlice from './slices/productsSlice';
import reportSlice from './slices/reportSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  alerts:alertSlice,
  cart:cartSlice,
  order:orderSlice,
  product:productsSlice,
  reports:reportSlice

});

export default rootReducer;
