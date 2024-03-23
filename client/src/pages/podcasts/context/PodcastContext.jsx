import { createContext, useState } from 'react'

export const PodcastContext = createContext();

export const PodcastContextProvider = ({ children }) => {
    
    const [title, setTitle] = useState("");
    
    return (
        <PodcastContext.Provider value={{
            title, setTitle
        }}>
            {children}
        </PodcastContext.Provider>
    )
}
