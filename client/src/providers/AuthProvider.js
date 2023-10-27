import { useState, useEffect, useMemo, useCallback } from "react"
import { AuthContext } from "../contexts";
import { getRequest, setAuthToken, removeAuthToken } from "../utils";

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

    const login = useCallback(async (token) => {
        setAuthToken(token);
        setUser(await getUser());
    }, []);

    const logout = useCallback(() => {
        removeAuthToken();
        setUser(null);
    }, []);

    const contextValue = useMemo(() => ({ user, isValidatedToken, login, logout }), [user, isValidatedToken]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}