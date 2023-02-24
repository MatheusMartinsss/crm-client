import React from "react";
import { Box, Divider, Typography } from '@mui/material';
import NegociacoesList from "./negociacoes-list";
export const GroupBox = ({ groupName, groupId, data, index }) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            minWidth='300px'
            bgcolor='#1E80FF'
            gap={2}
            padding='10px'
        >
            <Typography align='left' color='white' variant="h5">{groupName}</Typography>
            <Divider />
            <NegociacoesList
                negociacoes={data}
                group={groupName}
                groupId={groupId}
                index={index}
            />
        </Box>
    )
}