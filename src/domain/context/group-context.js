import React, { useContext, useState } from 'react'
export const Ctx = React.createContext([])

const UseGroupProvider = ({ children }) => {
    const [data, setData] = useState([]);


    const getGroups = () => data

    const addGroup = (data) => {
        setData((state) => [...state, data])
    }

    const setGroups = (data) => setData(data)

    const updateGroup = (id, body) => {
        const newValue = data.map((item) => {
            if (item.id === id)
                return body
            return item
        })
        setData(newValue)
    }
    return (
        <Ctx.Provider value={{ getGroups, addGroup, setGroups, updateGroup }}>
            {children}
        </Ctx.Provider>
    )
}
export function useGroup() {
    const context = useContext(Ctx);
    return context;
}
export default UseGroupProvider;
