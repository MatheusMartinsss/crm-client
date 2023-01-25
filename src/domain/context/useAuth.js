import React, { useContext, useState } from 'react'
export const useAuthContext = React.createContext([])

const UseAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <useAuthContext.Provider value={{ setUser, user }}>
            {children}
        </useAuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(useAuthContext);
    return context;
}
export default UseAuthProvider;
