
import { Box, styled } from '@mui/material'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { GroupBox } from './group-box'

const CustomBox = styled(Box)(({ theme }) => ({
    height: '100%',
    overflowX: 'auto',
    gap: 1,
    display: 'flex',
    maxWidth: '100%'
}));


const NegociacoesKankanList = ({ groups, negociacoes, handleUpdate, onSelect }) => {
    return (
        <DragDropContext onDragEnd={handleUpdate} >
            <CustomBox
            >
                {groups.map((item) => {
                    const groupNecociacoes = negociacoes.filter((n) => n.group_id === item.id)
                    const totalValue = groupNecociacoes.reduce((acc, b) => {
                        return acc + parseFloat(b.value)
                    }, 0).toFixed(2)
                    return (
                        <GroupBox
                            key={item.id}
                            groupName={item.name}
                            totalValue={totalValue}
                            groupDescription={item.description}
                            groupId={item.id}
                            data={groupNecociacoes}
                            onSelect={onSelect}
                        />
                    )
                })}
            </CustomBox>
        </DragDropContext>
    )
}

export default NegociacoesKankanList