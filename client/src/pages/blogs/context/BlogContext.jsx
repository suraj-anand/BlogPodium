import { createContext, useState } from 'react'

export const BlogContext = createContext()

export const BlogContextProvider = ({children}) => {
    
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("");
    
    return (
        <BlogContext.Provider value={{
            title, setTitle,
            content, setContent
        }}>
            {children}
        </BlogContext.Provider>
    )
}