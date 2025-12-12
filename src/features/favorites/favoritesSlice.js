import { createSlice } from '@reduxjs/toolkit';

const getFavoritesFromLocalStorage = () => {
    try {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
        console.error('Failed to parse favorites from localStorage:', e);
        return [];
    }
};

const initialState = {
    items: getFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const product = action.payload;
            const exists = state.items.some(item => item.id === product.id);
            if (!exists) {
                state.items.push(product);
                try {
                    localStorage.setItem('favorites', JSON.stringify(state.items));
                } catch (e) {
                    console.error('Failed to save favorites to localStorage:', e);
                }
            }
        },
        removeFromFavorites: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            try {
                localStorage.setItem('favorites', JSON.stringify(state.items));
            } catch (e) {
                console.error('Failed to save favorites to localStorage:', e);
            }
        },
        clearFavorites: (state) => {
            state.items = [];
            try {
                localStorage.setItem('favorites', JSON.stringify([]));
            } catch (e) {
                console.error('Failed to save favorites to localStorage:', e);
            }
        },
    },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
