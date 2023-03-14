
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { getNegociacoesByGroup, remoteUpdateNegociacaoUseCase, remoteFetchNegociacaoUseCase } from '../../../domain/useCases/remote-negociacoes-useCase'
import { GroupBox } from './group-box'
import { NegociacaoModal } from '../negociacao-form/negociacao-modal'
const NegociacoesKankanList = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [negociacaoSelected, setNegociacaoSelected] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await getNegociacoesByGroup()
            setData(response)
        }
        fetchData()
    }, [])

    const handleModal = () => setOpen((state) => !state)

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
    const editNegociacao = async (id) => {
        const response = await remoteFetchNegociacaoUseCase(id)
        setNegociacaoSelected(response)
        handleModal()
    }
    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box
                    display='flex'
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap = {1}
                >
                    {data.map((item) => (
                        <GroupBox
                            key={item.id}
                            groupName={item.name}
                            totalValue={item.valueTotal}
                            groupDescription={item.description}
                            groupId={item.id}
                            data={item.Negociacoes}
                            handleEditNegociacao={editNegociacao}
                        />
                    ))}
                </Box>
            </DragDropContext>
            <NegociacaoModal open={open} data={negociacaoSelected} handleModal={handleModal} />
        </React.Fragment>
    )
}

export default NegociacoesKankanList