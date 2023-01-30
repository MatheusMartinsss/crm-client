import { Box, Fab } from '@mui/material'
import React from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'

export const HomeView = () => {
    return (
        <Box display='flex' justifyContent='space-between' flexDirection='column' gap={5}>
            <NegociacoesTable />
            <Fab variant="extended" size="small" sx={{ width: 300 }} color="primary" aria-label="add">
                Nova negociação
            </Fab>
        </Box>
    )
}