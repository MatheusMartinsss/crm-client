import { useState } from "react"
import { ListClientes } from "../../domain/useCases/remote-clientes-useCase"
export const useCliente = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        await ListClientes()
            .then((response) => setData(response))
            .finally(() => setIsLoading(false))
    }
    const addCliente = (response) => {
        const newValue = data.map((item) => ({
            ...item,
            ...response
        }))
        setData(newValue)
    }
    return {
        data,
        isLoading,
        fetchData,
        addCliente
    }
}