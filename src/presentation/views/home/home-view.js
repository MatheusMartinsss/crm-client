import { Box, ButtonGroup, Button, styled, Grid, TextField, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'
import NegociacoesKankanList from '../../components/kanban-list/negociacoes-kanban'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import { NegociacaoBoard } from '../../components/negociacao-view/NegociacaoBoard';
import Layout from '../../components/layout/layout';
import { FilterBox } from '../../components/custom-styles/custom-styles';
import { Modal } from '../../components/Modal/Modal';
import { ListGroups } from '../../../domain/useCases/remote-groups-useCase';
import { ListNegociacoes, updateNegociacao } from '../../../domain/useCases/remote-negociacoes-useCase';
import { enqueueSnackbar } from 'notistack';
import { PrioritySelect } from '../../components/prioritySelect';
import SearchClientes from '../../components/SearchClientes';
import SearchIcon from '@mui/icons-material/Search'


const Options = {
    kanban: 'kanban',
    list: 'list'
}
const CustomButton = styled(Button)((props) => ({
    borderColor: props.selected ? 'primary.main' : 'rgba(0, 0, 0, 0.23)',
    color: 'primary',
    boxShadow: props.selected ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
}))
CustomButton.defaultProps = {
    size: 'large'
}

const CustomTextField = styled(TextField)({

})

CustomTextField.defaultProps = {
    size: 'large'
}



export const HomeView = () => {
    const [listType, setListType] = useState(Options.kanban)
    const [open, setOpen] = useState(false)
    const [negociacaoSelected, setSelected] = useState(null)
    const [groups, setGroups] = useState([])
    const [negociacoes, setNegociacoes] = useState([])
    const [loading, setLoading] = useState({ groups: true, negociacoes: true })
    const [query, setQuery] = useState({ from: '', to: '', prioridade: '', cliente: null })

    useEffect(() => {
        getGroups()
    }, [])
    useEffect(() => {
        getNegociacoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const getGroups = async () => {
        await ListGroups().then((response) => {
            setGroups(response)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading((state) => ({ ...state, groups: !state.groups }))
        })
    }
    const getNegociacoes = async () => {
        await ListNegociacoes({
            clienteId: query?.cliente?.id,
            prioridade: query.prioridade
        }).then((response) => {
            setNegociacoes(response)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading((state) => ({ ...state, negociacoes: !state.negociacoes }))
        })
    }
    const handleDrag = (result) => {
        const { destination, draggableId } = result
        const newValue = negociacoes.map((item) => {
            if (item.id === draggableId) {
                return {
                    ...item,
                    group_id: parseInt(destination.droppableId)
                }
            }
            return item
        })
        setNegociacoes([...newValue])
    }
    const onSelect = (data) => {
        setSelected(data)
        handleModal()
    }

    const getSelected = () => {
        return negociacoes.find((item) => item.id === negociacaoSelected)
    }

    const handleModal = () => setOpen((state) => !state)



    const onUpdateSelected = async (key, data) => {
        const body = { [key]: data }
        await updateNegociacao(negociacaoSelected, body).then((response) => {
            const newValue = negociacoes.map((item) => {
                if (item.id === response.id) {
                    return response
                }
                return item
            })
            setNegociacoes([...newValue])
            enqueueSnackbar('Negociacao atualizada com sucesso!', { variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'bottom' } })
        }).catch((error) => {
            enqueueSnackbar('Houve um erro na atualização!', { variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'bottom' } })
        })
    }
    return (

        <Layout>
            <Box display='flex' flexDirection='column' gap={1} width='100%'>
                <FilterBox>
                    <Grid container spacing={1} display='flex' alignItems='center'>
                        <Grid item >
                            <ButtonGroup size='small' variant="outlined" aria-label="outlined primary button group" >
                                <CustomButton
                                    onClick={() => setListType(Options.kanban)}
                                    selected={listType === Options.kanban}
                                >
                                    <CalendarViewWeekOutlinedIcon />
                                </CustomButton>
                                <CustomButton
                                    onClick={() => setListType(Options.list)}
                                    selected={listType === Options.list}
                                >
                                    <DensitySmallIcon />
                                </CustomButton>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={2}>
                            <SearchClientes
                                value={query.cliente}
                                size='small'
                                onChange={(value) => setQuery((state) => ({ ...state, cliente: value }))}
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        fullWidth
                                        placeholder='Clientes..'
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs = {1} >
                            <PrioritySelect
                                fullWidth
                                value={query.prioridade}
                                size='small'
                                onChange={(e) => setQuery((state) => ({ ...state, prioridade: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </FilterBox>
                <Box >
                    {listType === Options.list && (
                        <NegociacoesTable
                            data={negociacoes}
                            onSelect={onSelect}
                        />
                    )}
                    {listType === Options.kanban && (
                        <NegociacoesKankanList
                            groups={groups}
                            negociacoes={negociacoes}
                            handleUpdate={handleDrag}
                            onSelect={onSelect}
                        />
                    )}
                </Box>
                <Modal
                    open={open}
                    onClose={handleModal}
                    maxWidth='lg'
                >
                    <NegociacaoBoard
                        data={getSelected()}
                        handleUpdate={onUpdateSelected}
                    />
                </Modal>
            </Box>
        </Layout >

    )
}