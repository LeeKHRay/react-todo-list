import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getRequest, setAuthToken, removeAuthToken } from "../utils";

const AuthContext = createContext();

export const useAuthContext = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }
    
    return auth;
}

const getUser = async () => {
    const res = await getRequest("/api/users/user");
    if (res.ok) {
        return await res.json();
    }
    return null;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isValidatedToken, setIsValidatedToken] = useState(false);
    
    useEffect(() => {
        (async () => {
            const user = await getUser();
            if (user) {
                setUser(user);
            }
            else {
                removeAuthToken();
            }
            setIsValidatedToken(true);
        })();
    }, []);

    const login = async (token) => {
        setAuthToken(token);
        setUser(await getUser());
    };

    const logout = () => {
        removeAuthToken();
        setUser(null);
    };

    const contextValue = useMemo(() => ({ user, isValidatedToken, login, logout }), [user, isValidatedToken]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}