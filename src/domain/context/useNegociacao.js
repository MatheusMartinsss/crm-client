import React, { useContext, useState } from 'react'
export const Ctx = React.createContext([])

const UseNegociacaoProvider = ({ children }) => {
    const [data, setData] = useState([]);


    const getNegociacoes = () => data

    const addNegociacao = (data) => {
        setData((state) => [...state, data])
    }

    const setNegociacoes = (data) => setData(data)
    return (
        <Ctx.Provider value={{ getNegociacoes, addNegociacao, setNegociacoes }}>
            {children}
        </Ctx.Provider>
    )
}
export function useNegociacao() {
    const context = useContext(Ctx);
    return context;
}
export default UseNegociacaoProvider;
