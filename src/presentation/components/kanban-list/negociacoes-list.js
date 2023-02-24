import React, { useState } from 'react'
import { Box, Button } from '@mui/material';
import Negociacao from './negociacao';
import { Droppable } from "react-beautiful-dnd";
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250
});

const NegociacoesList = ({ negociacoes, group, index, groupId }) => {
    return (
        <Droppable droppableId={groupId.toString()} key={index}>
            {(provided, snapshot) => (
                <Box
                    display='flex'
                    flexDirection='column'
                    gap={1}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >

                    {provided.placeholder}
                    {negociacoes.map((negociacao, idx) => (
                        <Negociacao key={idx} index={idx} negociacao={negociacao} />
                    ))}
                </Box>
            )}
        </Droppable>
    )
};

export default NegociacoesList