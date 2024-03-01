import { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [authStatus, setAuthStatus] = useState(false);
    const [ name, setName ] = useState("");

    return (
        <AuthContext.Provider value={{authStatus, setAuthStatus, name, setName}}>
            {children}
        </AuthContext.Provider>
    )
} 
