import { Box, ButtonGroup, Button, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NegociacoesTable from '../../components/negociacoes-list/negociacoes-table'
import NegociacoesKankanList from '../../components/kanban-list/negociacoes-kanban'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import { NegociacaoBoard } from '../../components/negociacao-view/NegociacaoBoard';
import { useNegociacao } from '../../hooks/useNegociacao';
import Layout from '../../components/layout/layout';
import { FilterBox } from '../../components/custom-styles/custom-styles';
import { Modal } from '../../components/Modal/Modal';
import { ListGroups } from '../../../domain/useCases/remote-groups-useCase';
import { ListNegociacoes } from '../../../domain/useCases/remote-negociacoes-useCase';

const Options = {
    kanban: 'kanban',
    list: 'list'
}
const CustomButton = styled(Button)((props) => ({
    borderColor: props.isSelected ? 'primary.main' : 'rgba(0, 0, 0, 0.23)',
    backgroundColor: 'transparent',
    color: 'primary',
    boxShadow: props.isSelected ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
}))

export const HomeView = () => {
    const [listType, setListType] = useState(Options.kanban)
    const [open, setOpen] = useState(false)
    const [negociacaoSelected, setSelected] = useState(null)
    const [groups, setGroups] = useState([])
    const [negociacoes, setNegociacoes] = useState([])
    const [loading, setLoading] = useState({ groups: true, negociacoes: true })
    useEffect(() => {
        getGroups()
        getNegociacoes()
    }, [])

    const { getNegociacaoById } = useNegociacao()

    const getGroups = async () => {
        await ListGroups({}).then((response) => {
            setGroups(response)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading((state) => ({ ...state, groups: !state.groups }))
        })
    }
    const getNegociacoes = async () => {
        await ListNegociacoes().then((response) => {
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
    const onSelect = (id) => {
        const negociacao = getNegociacaoById(id)
        setSelected(negociacao)
        handleModal()
    }

    const handleModal = () => setOpen((state) => !state)

    const onUpdateSelected = (key, data) => {
        console.log(data)
        //updateNegociacao(negociacaoSelected.group_id, negociacaoSelected.id, )
    }
    return (
        <React.Fragment>
            <Layout>
                <Box display='flex' justifyContent='space-between' flexDirection='column' gap={1}>
                    <FilterBox>
                        <Box display='flex' alignItems='center' gap={2}>
                            <Button onClick={handleModal} size='small' variant='contained' color='primary'>+ Negocio</Button>
                            <ButtonGroup size='small' variant="outlined" aria-label="outlined primary button group" >
                                <CustomButton
                                    onClick={() => setListType(Options.list)}
                                    isSelected={listType === Options.list}
                                >
                                    <DensitySmallIcon />
                                </CustomButton>
                                <CustomButton
                                    onClick={() => setListType(Options.kanban)}
                                    isSelected={listType === Options.kanban}
                                >
                                    <CalendarViewWeekOutlinedIcon />
                                </CustomButton>
                            </ButtonGroup>
                        </Box>
                    </FilterBox>
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
                    <Modal
                        open={open}
                        onClose={handleModal}
                        maxWidth='lg'
                    >
                        <NegociacaoBoard data={negociacaoSelected} handleUpdate={onUpdateSelected} />
                    </Modal>
                </Box>
            </Layout>
        </React.Fragment>
    )
}