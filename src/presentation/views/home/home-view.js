import { Box, ButtonGroup, Button } from '@mui/material'
import React, { useState } from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'
import NegociacoesKankanList from '../../components/kanban-list/negociacoes-kanban'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import { NegociacaoModal } from '../../components/negociacao-form/negociacao-modal';
import { NegociacaoViewModal } from '../../components/negociacao-view/NegociacaoViewModal';
import { useNegociacao } from '../../hooks/useNegociacao';
import Layout from '../../components/layout/layout';
import { FilterBox } from '../../components/custom-styles/custom-styles';

const Options = {
    kanban: 'kanban',
    list: 'list'
}
export const HomeView = () => {
    const [listType, setListType] = useState(Options.kanban)
    const [open, setOpen] = useState(false)
    const [negociacaoSelected, setSelected] = useState(null)

    const { data, isLoading, getNegociacoes, updateNegociacaoGroup, getNegociacaoById, updateNegociacao, addNegociacao } = useNegociacao()

    const onSelect = (id) => {
        let negociacao = getNegociacaoById(id)
        setSelected(negociacao)
        handleModal()
    }

    const handleModal = () => setOpen(true)

    const onClose = () => {
        setOpen(false)
        setSelected(null)
    }

    return (
        <Layout>
            <Box display='flex' justifyContent='space-between' flexDirection='column' gap={1}>
                <FilterBox>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Button onClick={handleModal} size='small' variant='contained' color='primary'>+ Negocio</Button>
                        <ButtonGroup size='small' variant="outlined" aria-label="outlined primary button group" >
                            <Button
                                color='primary'
                                onClick={() => setListType(Options.list)}
                                sx={{
                                    borderColor: listType === Options.list ? 'primary.main' : 'rgba(0, 0, 0, 0.23)',
                                    backgroundColor: listType === Options.list ? 'transparent' : 'transparent',
                                    color: listType === Options.list ? 'primary' : 'primary',
                                    boxShadow: listType === Options.list ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
                                }}
                            >
                                <DensitySmallIcon />
                            </Button>
                            <Button
                                color='primary'
                                onClick={() => setListType(Options.kanban)}
                                sx={{
                                    borderColor: listType === Options.kanban ? 'primary.main' : 'rgba(0, 0, 0, 0.23)',
                                    backgroundColor: listType === Options.kanban ? 'transparent' : 'transparent',
                                    color: listType === Options.kanban ? 'primary' : 'primary',
                                    boxShadow: listType === Options.kanban ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
                                }}
                            >
                                <CalendarViewWeekOutlinedIcon />
                            </Button>
                        </ButtonGroup>
                    </Box>
                </FilterBox>
                {listType === 'list' ?
                    (<NegociacoesTable
                        data={getNegociacoes()}
                        onSelect={onSelect}
                    />
                    ) : (
                        <NegociacoesKankanList
                            data={data}
                            handleUpdate={updateNegociacaoGroup}
                            onSelect={onSelect}
                        />
                    )}
                {/*<NegociacaoModal
                    open={open}
                    handleModal={handleModal}
                    data={negociacaoSelected}
                    onUpdate={updateNegociacao}
                    onCreate={addNegociacao}
                    onClose={onClose}
                />*/}
                <NegociacaoViewModal
                    open={open}
                    handleModal={onClose}
                    data={negociacaoSelected}
                />
            </Box>
        </Layout>
    )
}