import { createContext, useContext, useMemo, useState } from 'react';
import { parseJwt } from '../utils/jwt';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [user, setUser] = useState(() => {
        const t = localStorage.getItem('token');
        if (!t) return null;
        try { return { username: parseJwt(t)?.sub || parseJwt(t)?.username || '' }; }
        catch { return null; }
    });

    const login = (newToken) => {
        if (!newToken || typeof newToken !== 'string') {
            console.error('Invalid or empty token');
            return;
        }

        try {
            const payload = parseJwt(newToken);
            const username = payload?.sub || payload?.username;
            if (!username) throw new Error('Invalid token payload');

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser({ username });
        } catch (err) {
            console.error('Failed to parse token:', err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    return useContext(AuthContext);
}