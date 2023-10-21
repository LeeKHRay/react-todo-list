import { useState, useEffect, useMemo } from "react"
import { AuthContext } from "../contexts/AuthContext";
import { getRequest, setAuthToken, getAuthToken, removeAuthToken } from "../utils";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getAuthToken);
    const [user, setUser] = useState(null);

    console.log(token, user)
    useEffect(() => {
        (async () => {
            if (token) {
                setAuthToken(token);

                const res = await getRequest("/users/user");
                if (res.ok) {
                    const user = await res.json();
                    setUser(user);
                    return;
                }
            }
            removeAuthToken();
        })();
    }, [token]);

    const contextValue = useMemo(() => ({ 
        token, 
        setToken,
        user
    }), [token, user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}