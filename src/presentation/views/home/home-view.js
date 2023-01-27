import { Box } from '@mui/material'
import React from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'

export const HomeView = () => {
    return (
        <Box flexGrow={1}>
            <NegociacoesTable />
        </Box>
    )
}