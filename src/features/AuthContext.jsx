import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, onAuthRequired }) {
    return (
        <AuthContext.Provider value={{ onAuthRequired }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        return { onAuthRequired: null };
    }
    return context;
}
