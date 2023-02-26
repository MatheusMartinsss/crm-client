import React from "react";
import { Box, Typography } from '@mui/material';
import NegociacoesList from "./negociacoes-list";
export const GroupBox = ({ groupName, groupId, totalValue, groupDescription, data, index }) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            minWidth='350px'
        >
            <Box
                display='flex'
                padding='5px'
                bgcolor='#F5F5F5'
                height='80px'
                flexDirection='column'
            >
                <Typography align='left' variant="h5">{groupName}</Typography>
                <Typography variant="subtitle1">R${totalValue} - {data.length} Negociacoes</Typography>
            </Box>
            <NegociacoesList
                negociacoes={data}
                group={groupName}
                groupId={groupId}
                index={index}
            />
        </Box>
    )
}