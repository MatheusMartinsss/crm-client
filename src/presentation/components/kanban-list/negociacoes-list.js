import React from 'react'
import { Box, Button } from '@mui/material';
import Negociacao from './negociacao';
import { Droppable } from "react-beautiful-dnd";
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#F5F5F5",
    padding: 5,
    minWidth: 350
});

const NegociacoesList = ({ negociacoes, group, index, groupId }) => {
    return (
        <Droppable droppableId={groupId.toString()} key={index}>
            {(provided, snapshot) => (
                <Box
                    display='flex'
                    flexDirection='column'
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    {provided.placeholder}
                    {negociacoes.map((negociacao, idx) => (
                        <Negociacao
                            key={idx}
                            index={idx}
                            negociacao={negociacao}
                        />
                    ))}
                </Box>
            )}
        </Droppable>
    )
};

export default NegociacoesList