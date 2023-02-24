import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'
import NegociacoesKankanList from '../../components/kanban-list/negociacoes-kanban'
export const HomeView = () => {
    const [list, setList] = useState(true)
    return (
        <Box display='flex' justifyContent='space-between' flexDirection='column' gap={5}>
            <Button onClick={() => setList((state) => !state)}>List</Button>
            {list ?
                <NegociacoesTable />
                :
                <NegociacoesKankanList />
            }
        </Box>
    )
}