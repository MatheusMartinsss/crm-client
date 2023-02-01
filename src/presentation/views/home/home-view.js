import { Box } from '@mui/material'
import React from 'react'
import { NegociacaoModal } from '../../components/negociacao-form/negociacao-modal'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'

export const HomeView = () => {
    return (
        <Box display='flex' justifyContent='space-between' flexDirection='column' gap={5}>
            <NegociacoesTable />
            <NegociacaoModal />
        </Box>
    )
}