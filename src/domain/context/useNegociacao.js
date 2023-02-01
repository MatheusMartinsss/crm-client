import React, { useContext, useState } from 'react'
export const context = React.createContext([])

const UseNegociacaoProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const getNegociacoes = () => data

    const addNegociacao = (data) => setData((state) => ({ ...state, data }))
    return (
        <context.Provider value={{ getNegociacoes, addNegociacao }}>
            {children}
        </context.Provider>
    )
}
export function useNegociacao() {
    const context = useContext(context);
    return context;
}
export default UseNegociacaoProvider;
