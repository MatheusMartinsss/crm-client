import React, { useContext, useState } from 'react'
export const Ctx = React.createContext([])

const UseUsersProvider = ({ children }) => {
    const [data, setData] = useState([]);


    const getUsers = () => data

    const addUsers = (data) => {
        setData((state) => [...state, data])
    }

    const setUsers = (data) => setData(data)

    const updateUsers = (id, body) => {
        const newValue = data.map((item) => {
            if (item.id === id)
                return body
            return item
        })
        setData(newValue)
    }
    return (
        <Ctx.Provider value={{ getUsers, addUsers, setUsers, updateUsers }}>
            {children}
        </Ctx.Provider>
    )
}
export function useUsers() {
    const context = useContext(Ctx);
    return context;
}
export default UseUsersProvider;
