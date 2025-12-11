import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/auth/authSlice.js';
import cartReducer from '../src/features/cart/cartSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
});

export default store;
