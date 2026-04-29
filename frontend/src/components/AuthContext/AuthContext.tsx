import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: number;
    imie: string;
    nazwisko: string;
    email: string;
    karnet?: {
        typ: string;
        znizka: number;
    } | null;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, haslo: string) => Promise<boolean>;
    register: (imie: string, nazwisko: string, email: string, haslo: string) => Promise<boolean>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async (authToken: string) => {
        try {
            const res = await fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            const data = await res.json();
            if (data.user) {
                setUser(data.user);
            } else {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        } catch {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        }
    };

    useEffect(() => {
        if (token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchUser(token).finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, haslo: string): Promise<boolean> => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, haslo })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            setToken(data.token);
            setUser(data.user);
            return true;
        }
        return false;
    };

    const register = async (imie: string, nazwisko: string, email: string, haslo: string): Promise<boolean> => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imie, nazwisko, email, haslo })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            setToken(data.token);
            setUser(data.user);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        if (token) {
            await fetchUser(token);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, refreshUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}