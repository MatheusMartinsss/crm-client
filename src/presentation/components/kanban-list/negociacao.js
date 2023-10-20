import React from 'react'
import { Box, Typography, Paper, Avatar, Stack } from '@mui/material'
import { Draggable } from "react-beautiful-dnd";
import { PriorityChip } from '../PriorityChip/PriorityChip';
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 10,
    margin: `0 0 8px 0`,
    // change background colour if dragging
    background: isDragging && "lightgreen",
    borderRadius: 8,
    // styles we need to apply on draggables
    ...draggableStyle
});
const Negociacao = ({ negociacao, index, onSelect }) => {
    const { name, Cliente, value, id, prioridade } = negociacao
    return (
        <Draggable key={id} draggableId={id.toString()} index={index}  >
            {(provided, snapshot) => (
                <Box
                    display='flex'
                    flexDirection='column'
                    component={Paper}
                    elevation={2}
                    gap={2}
                    onClick={() => onSelect(negociacao.id)}
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
                        <PriorityChip label={prioridade} />
                    </Stack>
                </Box>
            )}
        </Draggable>
    )
}
export default Negociacao