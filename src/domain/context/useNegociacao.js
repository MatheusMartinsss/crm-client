import React, { useContext, useState } from 'react'
export const Ctx = React.createContext([])

const UseNegociacaoProvider = ({ children }) => {
    const [data, setData] = useState([]);


    const getNegociacoes = () => data

    const addNegociacao = (data) => {
        setData((state) => [...state, data])
    }

    const setNegociacoes = (data) => setData(data)

    const updateNegociacao = (id, body) => {
        const newValue = data.map((item) => {
            if (item.id === id)
                return body
            return item
        })
        setData(newValue)
    }
    return (
        <Ctx.Provider value={{ getNegociacoes, addNegociacao, setNegociacoes, updateNegociacao }}>
            {children}
        </Ctx.Provider>
    )
}
export function useNegociacao() {
    const context = useContext(Ctx);
    return context;
}
export default UseNegociacaoProvider;
