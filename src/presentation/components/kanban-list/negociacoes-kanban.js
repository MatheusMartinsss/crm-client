
import { Box } from '@mui/material'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { GroupBox } from './group-box'

const NegociacoesKankanList = ({ data, handleUpdate, onSelect }) => {

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={handleUpdate}>
                <Box
                    display='flex'
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={1}
                >
                    {data.map((item) => (
                        <GroupBox
                            key={item.id}
                            groupName={item.name}
                            totalValue={item.valueTotal}
                            groupDescription={item.description}
                            groupId={item.id}
                            data={item.Negociacoes}
                            onSelect={onSelect}
                        />
                    ))}
                </Box>
            </DragDropContext>
        </React.Fragment>
    )
}

export default NegociacoesKankanList