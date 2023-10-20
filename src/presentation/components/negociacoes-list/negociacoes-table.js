import React, { useState } from "react"
import { Table, TableBody, TableCell, TableRow, Paper, Chip, TableContainer, IconButton, TableSortLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CTableCellHeader, TableHeader } from "../custom-styles/custom-styles";
import { TableCellDate } from "../TableCellDate";
import { PriorityChip } from "../PriorityChip/PriorityChip";


const createData = (id, groupName, title, vendedorName, clienteName, clienteLastName, closeExpect, prioridade) => {
    return {
        id,
        groupName,
        title,
        vendedorName,
        clienteName,
        clienteLastName,
        closeExpect,
        prioridade
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
        id: 'prioridade',
        label: 'Prioridade'
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
        item.prioridade
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
            <TableContainer component={Paper} sx={{ height: 650 }}>
                <Table  >
                    <TableHeader>
                        <TableRow >
                            {colums.map((item) => (
                                <CTableCellHeader
                                    key={item.id}
                                    align="left"
                                    onClick={() => handleSortChange(item.id)}
                                >
                                    <TableSortLabel active={orderBy === item.id}>
                                        {item.label}
                                    </TableSortLabel>
                                </CTableCellHeader>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {handleSorting(orderBy, order, negociacoes).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row?.groupName}</TableCell>
                                <TableCell align="left">{row?.title}</TableCell>
                                <TableCell align="left">{row?.vendedorName}</TableCell>
                                <TableCell align="left">{row?.clienteName} {row?.clienteLastname}</TableCell>
                                <TableCellDate align='left' date={row.closeExpect} />
                                <TableCell align='left' ><PriorityChip label={row.prioridade} /></TableCell>
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