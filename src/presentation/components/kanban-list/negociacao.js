import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { Draggable } from "react-beautiful-dnd";
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 10,
    margin: `0 0 8px 0`,
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#FFFFFF",
    borderRadius: 8,
    // styles we need to apply on draggables
    ...draggableStyle
});
const Negociacao = ({ negociacao, index, handleEditNegociacao }) => {
    const { name, description, Cliente, value, id } = negociacao
    return (
        <Draggable key={id} draggableId={id.toString()} index={index}  >
            {(provided, snapshot) => (
                <Box
                    display='flex'
                    flexDirection='column'
                    component={Paper}
                    elevation={2}
                    onClick={() => handleEditNegociacao(id)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <Typography variant='h6'>{name}</Typography>
                    <Typography variant='subtitle1'>{description}</Typography>
                    <Typography variant='subtitle2'>{Cliente.name}</Typography>
                    <Typography variant='subtitle2'>R${value}</Typography>
                </Box>
            )}
        </Draggable>
    )
}
export default Negociacao