import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const ContextUser = createContext();
export const ContextUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("currentToken");
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser({ token, ...decodedUser });
            } catch (e) {
                console.error("Invalid token");
                localStorage.removeItem("currentToken");
            }
        }
    }, []);
    return (
        <ContextUser.Provider value={{ user, setUser }}>
            {children}
        </ContextUser.Provider>
    );
};