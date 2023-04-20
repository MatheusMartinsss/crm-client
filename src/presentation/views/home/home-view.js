import { Box, ButtonGroup, Button } from '@mui/material'
import React, { useState } from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'
import NegociacoesKankanList from '../../components/kanban-list/negociacoes-kanban'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import { NegociacaoModal } from '../../components/negociacao-form/negociacao-modal';
import Layout from '../../components/layout/layout';
export const HomeView = () => {
    const [listType, setListType] = useState('kanban')
    const [open, setOpen] = useState(false)

    const handleModal = () => setOpen((state) => !state)
    return (
        <Layout>
            <Box display='flex' justifyContent='space-between' flexDirection='column' gap={1}>
                <Box
                    display='flex'
                    flexDirection='row'
                    gap={1}
                >
                    <ButtonGroup size='small' variant="outlined" aria-label="outlined primary button group" >
                        <Button color='primary' onClick={() => setListType('list')}>
                            <DensitySmallIcon />
                        </Button>
                        <Button color='primary' onClick={() => setListType('kanban')}>
                            <CalendarViewWeekOutlinedIcon  />
                        </Button>
                    </ButtonGroup>
                    <Button onClick={handleModal} size='small' variant='contained' color='primary'>+ Negocio</Button>
                </Box>
                {listType === 'list' ? (<NegociacoesTable />) : (<NegociacoesKankanList />)}
                <NegociacaoModal open={open} handleModal={handleModal} />
            </Box>
        </Layout>
    )
}