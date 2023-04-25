import React from "react";
import { Box, Typography, Paper } from '@mui/material';
import NegociacoesList from "./negociacoes-list";
export const GroupBox = ({ groupName, groupId, totalValue, groupDescription, data, index, onSelect }) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            width='400px'
            component={Paper}
        >
            <Box
                display='flex'
                padding='5px'
                height='60px'
                flexDirection='column'
            >
                <Typography sx={{ fontWeight: '700' }} align='left' variant="subtitle1">{groupName}</Typography>
                <Typography variant="subtitle1">R${totalValue} - {data.length} Negociacoes</Typography>
            </Box>
            <NegociacoesList
                negociacoes={data}
                group={groupName}
                groupId={groupId}
                index={index}
                onSelect={onSelect}
            />
        </Box>
    )
}