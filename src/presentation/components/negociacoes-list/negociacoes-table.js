import React, { useEffect, useState } from "react"
import { remoteGetNegociacoesUseCase, remoteFetchNegociacaoUseCase } from '../../../domain/useCases/remote-negociacoes-useCase'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, TableContainer, IconButton, Fab, TableSortLabel } from '@mui/material'
import { useNegociacao } from "../../../domain/context/useNegociacao"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NegociacaoModal } from '../../components/negociacao-form/negociacao-modal'

const createData = (id, groupName, title, vendedorName, clienteName, clienteLastName, closeExpect, tags) => {
    return {
        id,
        groupName,
        title,
        vendedorName,
        clienteName,
        clienteLastName,
        closeExpect,
        tags
    }
}

const colums = [
    {
        id: 'groupName',
        label: 'Fase Atual'
    }, {
        id: 'title',
        label: 'Titulo'
    }, {
        id: 'vendedorName',
        label: 'Vendedor'
    }, {
        id: 'clienteName',
        label: 'Cliente'
    }, {
        id: 'closeExpect',
        label: 'Fechamento Esperado'
    }, {
        id: 'tags',
        label: 'Tags'
    }, {
        id: 'options',
        label: 'Opções'
    }
]

export default function NegociacoesTable() {
    const { getNegociacoes, setNegociacoes } = useNegociacao()
    const [open, setOpen] = useState(false)
    const [orderBy, setOrderBy] = useState('groupName')
    const [order, setOrder] = useState('asc')
    const [negociacao, setNegociacao] = useState(null)
    const negociacoes = getNegociacoes().map((item) => createData(
        item.id,
        item.Group.name,
        item.name,
        item.Vendedor.name,
        item.Cliente.name,
        item.Cliente.lastname,
        item.closeExpect,
        item.Tags
    ))
    useEffect(() => {
        const fetchNegociacoes = async () => {
            const response = await remoteGetNegociacoesUseCase()
            setNegociacoes(response)
        }
        fetchNegociacoes()
        // eslint-disable-next-line 
    }, [])

    const fetchNegociacao = async (id) => {
        const response = await remoteFetchNegociacaoUseCase(id)
        setNegociacao(response)
        handleModal()
    }

    const handleModal = () => setOpen((state) => !state)

    const handleSortChange = (column) => {
        const sortOrder = column === orderBy && order === 'asc' ? 'desc' : 'asc';
        setOrder(sortOrder)
        setOrderBy(column)
    }
    const handleSorting = (sortField, sortOrder, data) => {
        if (sortField) {
            const sorted = [...data].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            return sorted
        }
    }
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, borderRadius: 5, border: 2, borderColor: '#A4D3EE' }} >
                    <TableHead sx={{ backgroundColor: '#B0E2FF', }}>
                        <TableRow >
                            {colums.map((item) => (
                                <TableCell
                                    key={item.id}
                                    align="left"
                                    onClick={() => handleSortChange(item.id)}
                                >
                                    <TableSortLabel
                                        active={orderBy === item.id}
                                    >
                                        {item.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {handleSorting(orderBy, order, negociacoes).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row?.groupName}</TableCell>
                                <TableCell align="left">{row?.title}</TableCell>
                                <TableCell align="left">{row?.vendedorName}</TableCell>
                                <TableCell align="left">{row?.clienteName} {row?.clienteLastname}</TableCell>
                                <TableCell align="left">{row.closeExpect || 'vazio'}</TableCell>
                                {!row?.tags?.length ? (
                                    <TableCell align='left'>Vazio</TableCell>
                                ) : (
                                    <TableCell align='left' >
                                        {row?.tags?.map((item) => (
                                            <Chip
                                                key={item.id}
                                                size='small'
                                                color='primary'
                                                variant='string'
                                                sx={{ backgroundColor: item.color, border: '1px' }}
                                                label={item.name}>
                                            </Chip>
                                        ))}
                                    </TableCell>
                                )}
                                <TableCell align="left">
                                    <IconButton onClick={() => fetchNegociacao(row.id)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <NegociacaoModal data={negociacao} handleModal={handleModal} open={open} />
            <Fab onClick={handleModal} variant="extended" size="small" sx={{ width: 300 }} color="primary" aria-label="add">
                Nova negociação
            </Fab>
        </React.Fragment>
    );
}