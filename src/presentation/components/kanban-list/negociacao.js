import React from 'react'
import { Box, Typography } from '@mui/material'
import { Draggable } from "react-beautiful-dnd";
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 8px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
const Negociacao = ({ negociacao, index }) => {
    const { name,  id } = negociacao
    return (
        <Draggable key={id} draggableId={id.toString()} index={index}  >
            {(provided, snapshot) => (
                <Box
                    bgcolor='#F5F5F5'
                    display='flex'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <Typography variant='h5'>{name}</Typography>
                </Box>
            )}
        </Draggable>
    )
}
export default Negociacao