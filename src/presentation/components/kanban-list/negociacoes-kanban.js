
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { getNegociacoesByGroup, remoteUpdateNegociacaoUseCase } from '../../../domain/useCases/remote-negociacoes-useCase'
import { GroupBox } from './group-box'

const NegociacoesKankanList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await getNegociacoesByGroup()
            setData(response)
        }
        fetchData()
    }, [])

    const onDragEnd = (result) => {
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
            updateNegociacao(negociacao.id, negociacao.group_id)
        }
    }
    const updateNegociacao = async (id, groupId) => {
        await remoteUpdateNegociacaoUseCase(id, { group_id: groupId })
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                display='flex'
                flexDirection={{ xs: 'column', md: 'row' }}
            >
                {data.map((item) => (
                    <GroupBox
                        key={item.id}
                        groupName={item.name}
                        totalValue={item.valueTotal}
                        groupDescription={item.description}
                        groupId={item.id}
                        data={item.Negociacoes}
                    />
                ))}
            </Box>
        </DragDropContext>
    )
}

export default NegociacoesKankanList