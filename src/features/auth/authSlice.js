import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
        return null;
    }
};

const initialState = {
    isAuthenticated: !!getInitialUser(),
    user: getInitialUser(),
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.isLoading = false;
            try {
                localStorage.setItem('user', JSON.stringify(action.payload));
            } catch (e) {
                console.error('Failed to save user to localStorage:', e);
            }
        },
        registerSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.isLoading = false;
            try {
                localStorage.setItem('user', JSON.stringify(action.payload));
            } catch (e) {
                console.error('Failed to save user to localStorage:', e);
            }
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.isLoading = false;
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setLoading, loginSuccess, registerSuccess, setError, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
