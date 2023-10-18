import { useEffect, useState } from "react"
import { getNegociacoesByGroup, remoteUpdateNegociacaoUseCase } from "../../domain/useCases/remote-negociacoes-useCase"

export const useNegociacao = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        await getNegociacoesByGroup()
            .then((response) => setData(response))
            .catch((error) => console.log(error))
            .finally(() => setIsloading(false))
    }
    const updateNegociacaoGroup = (result) => {
        const {
            source,
            destination,
        } = result;
        if (!destination) {
            return
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId
        const draggableId = result.draggableId
        if (sInd !== dInd) {
            let negociacao = {}
            let oldData = data;
            let dGroup = data.find((item) => item.id.toString() === dInd)
            let sGroup = data.find((item) => item.id.toString() === sInd)

            const sNegociacoes = Array.from(sGroup.Negociacoes).filter((item) => item.id.toString() === draggableId ? (negociacao = item, false) : true)

            const dNegociacoes = Array.from(dGroup.Negociacoes)

            negociacao.group_id = dInd

            dNegociacoes.push(negociacao)

            dGroup.valueTotal = parseFloat(dGroup.valueTotal) + parseFloat(negociacao.value)
            sGroup.valueTotal = parseFloat(sGroup.valueTotal) - parseFloat(negociacao.value)

            dGroup.Negociacoes = dNegociacoes
            sGroup.Negociacoes = sNegociacoes

            const newState = data.map((item) =>
                item.id.toString() === sGroup.id ? { ...sGroup } :
                    item.id.toString() === dGroup.id ? { ...dGroup } :
                        item

            )
            setData(newState)
            remoteUpdateNegociacao(negociacao.id, negociacao, oldData)
        }

    }
    const updateNegociacao = (groupId, id, body) => {
        const newValue = data.map((group) => {
            if (group.id === groupId) {
                const newNegociacoes = group.Negociacoes.map((negociacao) => {
                    if (negociacao.id === id) return {
                        ...body
                    }
                    return negociacao
                })
                return { ...group, Negociacoes: newNegociacoes }
            }
            return group
        })
        setData(newValue)
    }
    const addNegociacao = (groupId, body) => {
        const newValue = data.map((group) => {
            if (group.id === groupId) {
                const newNegociacoes = [...group.Negociacoes, { ...body }]
                return { ...group, Negociacoes: newNegociacoes }
            }
            return group
        })
        setData(newValue)
    }
    const getNegociacaoById = (id) => {
        const negociacao = getNegociacoes().find((item) => item.id === id)
        return negociacao
    }
    const getNegociacoes = () => {
        const negociacoes = data.reduce((acc, grupo) => {
            const negociacoesDoGrupo = grupo.Negociacoes.map(n => ({ ...n, Group: { id: grupo.id, name: grupo.name } })); // adiciona o nome do grupo a negociacao
            return [...acc, ...negociacoesDoGrupo];
        }, []);
        return negociacoes
    }

    const remoteUpdateNegociacao = async (id, body, old) => {
        await remoteUpdateNegociacaoUseCase(id, body)
            .catch((error) => {
                setData(old)
            })
    }
    return {
        data,
        setData,
        updateNegociacaoGroup,
        getNegociacoes,
        getNegociacaoById,
        updateNegociacao,
        addNegociacao,
        isLoading
    }
}