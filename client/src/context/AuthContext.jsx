import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [ authStatus, setAuthStatus ] = useState(true);
    const [ name, setName ] = useState(() => {
        const storedName = sessionStorage.getItem("name");
        return storedName ? storedName : "";
    });

    return (
        <AuthContext.Provider value={{
            authStatus, setAuthStatus,
            name, setName,
            }}>
            {children}
        </AuthContext.Provider>
    )
} 
