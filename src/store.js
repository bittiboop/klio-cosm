import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/auth/authSlice.js';
import cartReducer from '../src/features/cart/cartSlice.js';
import favoritesReducer from '../src/features/favorites/favoritesSlice.js';
import purchasesReducer from '../src/features/purchases/purchasesSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
        purchases: purchasesReducer,
    },
});

export default store;
