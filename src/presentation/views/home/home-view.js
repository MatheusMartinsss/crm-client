import { Box, ButtonGroup, Button } from '@mui/material'
import React, { useState } from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'
import NegociacoesKankanList from '../../components/kanban-list/negociacoes-kanban'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import { NegociacaoModal } from '../../components/negociacao-form/negociacao-modal';
import { useNegociacao } from '../../hooks/useNegociacao';
import Layout from '../../components/layout/layout';
export const HomeView = () => {
    const [listType, setListType] = useState('kanban')
    const [open, setOpen] = useState(false)
    const [negociacaoSelected, setSelected] = useState(null)

    const { data, isLoading, getNegociacoes, updateNegociacaoGroup, getNegociacaoById } = useNegociacao()

    const onSelect = (id) => {
        let negociacao = getNegociacaoById(id)
        setSelected(negociacao)
        handleModal()
    }

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
                            <CalendarViewWeekOutlinedIcon />
                        </Button>
                    </ButtonGroup>
                    <Button onClick={handleModal} size='small' variant='contained' color='primary'>+ Negocio</Button>
                </Box>
                {listType === 'list' ?
                    (<NegociacoesTable
                        data={getNegociacoes()}
                        onSelect={onSelect}
                    />
                    ) : (
                        <NegociacoesKankanList
                            data={data}
                            handleUpdate={updateNegociacaoGroup}
                            onSelect = {onSelect}
                        />
                    )}
                <NegociacaoModal open={open} handleModal={handleModal} data={negociacaoSelected} />
            </Box>
        </Layout>
    )
}