import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    purchases: localStorage.getItem('purchases') 
        ? JSON.parse(localStorage.getItem('purchases')) 
        : [],
};

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {
        addPurchase: (state, action) => {
            const newPurchase = {
                id: Date.now(),
                items: action.payload.items,
                subtotal: action.payload.subtotal,
                discountAmount: action.payload.discountAmount,
                total: action.payload.total,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                timestamp: Date.now(),
            };
            state.purchases.unshift(newPurchase);
            localStorage.setItem('purchases', JSON.stringify(state.purchases));
        },
        clearPurchases: (state) => {
            state.purchases = [];
            localStorage.removeItem('purchases');
        },
    },
});

export const { addPurchase, clearPurchases } = purchasesSlice.actions;
export default purchasesSlice.reducer;
