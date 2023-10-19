
import { Box } from '@mui/material'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { GroupBox } from './group-box'

const NegociacoesKankanList = ({ groups, negociacoes, handleUpdate, onSelect }) => {
    return (
        <React.Fragment>
            <DragDropContext onDragEnd={handleUpdate}>
                <Box
                    display='flex'
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={1}
                    sx={{
                        overflowX: 'auto'
                    }}
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
                </Box>
            </DragDropContext>
        </React.Fragment>
    )
}

export default NegociacoesKankanList