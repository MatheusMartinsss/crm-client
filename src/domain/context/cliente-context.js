import React, { useContext, useState } from 'react'
export const Ctx = React.createContext([])

const UseClienteProvider = ({ children }) => {
    const [data, setData] = useState([]);


    const getClientes = () => data

    const addCliente = (data) => {
        setData((state) => [...state, data])
    }

    const setClientes = (data) => setData(data)

    const updateCliente = (id, body) => {
        const newValue = data.map((item) => {
            if (item.id === id)
                return body
            return item
        })
        setData(newValue)
    }
    return (
        <Ctx.Provider value={{ getClientes, addCliente, setClientes, updateCliente }}>
            {children}
        </Ctx.Provider>
    )
}
export function useCliente() {
    const context = useContext(Ctx);
    return context;
}
export default UseClienteProvider;
