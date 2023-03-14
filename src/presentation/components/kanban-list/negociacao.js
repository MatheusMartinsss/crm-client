import React from 'react'
import { Box, Typography, Paper, Avatar, Stack } from '@mui/material'
import { Draggable } from "react-beautiful-dnd";
import { Tag } from '../tag';
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
    const { name, Cliente, value, id, Tags } = negociacao
    return (
        <Draggable key={id} draggableId={id.toString()} index={index}  >
            {(provided, snapshot) => (
                <Box
                    display='flex'
                    flexDirection='column'
                    component={Paper}
                    elevation={1}
                    onClick={() => handleEditNegociacao(id)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <Typography gutterBottom sx={{ fontWeight: '550' }} textOverflow='ellipsis' overflow='clip' variant='h6'>{name}</Typography>
                    <Stack display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Stack display='flex' flexDirection='row' alignItems='center' gap={0.5}>
                            <Avatar sx={{ width: 24, height: 24 }} />
                            <Typography variant='subtitle2'>{Cliente.name}</Typography>
                        </Stack>
                        <Typography variant='subtitle2'>R${value}</Typography>
                    </Stack>
                </Box>
            )}
        </Draggable>
    )
}
export default Negociacao