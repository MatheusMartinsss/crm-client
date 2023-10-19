import React from 'react'
import { Box} from '@mui/material';
import Negociacao from './negociacao';
import { Droppable } from "react-beautiful-dnd";
const getListStyle = isDraggingOver => ({
    background: isDraggingOver && "lightblue" ,
    padding: 5,
    width: 400,
});

const NegociacoesList = ({ negociacoes, index, groupId, onSelect }) => {
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
                            onSelect = {onSelect}
                            negociacao={negociacao}
                        />
                    ))}
                </Box>
            )}
        </Droppable>
    )
};

export default NegociacoesList