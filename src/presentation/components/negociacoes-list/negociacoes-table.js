import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, TableContainer, IconButton, TableSortLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';


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
        label: 'Status'
    }, {
        id: 'options',
        label: 'Opções'
    }
]

export default function NegociacoesTable({ data, onSelect }) {
    const [orderBy, setOrderBy] = useState('groupName')
    const [order, setOrder] = useState('asc')

    const negociacoes = data.map((item) => createData(
        item.id,
        item.Group.name,
        item.name,
        item.Vendedor.name,
        item.Cliente.name,
        item.Cliente.lastname,
        item.closeExpect,
        item.Tag
    ))
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
                <Table  >
                    <TableHead>
                        <TableRow >
                            {colums.map((item) => (
                                <TableCell
                                    key={item.id}
                                    align="left"
                                    onClick={() => handleSortChange(item.id)}
                                >
                                    <TableSortLabel active={orderBy === item.id}>
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
                                <TableCell align='left' >
                                    <Chip
                                        key={row?.tags?.id}
                                        size='small'

                                        variant='string'
                                        sx={{ backgroundColor: row?.tags?.color, border: '1px' }}
                                        label={row?.tags?.name}>
                                    </Chip>
                                </TableCell>
                                <TableCell align="left">
                                    <IconButton onClick={() => onSelect(row.id)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}