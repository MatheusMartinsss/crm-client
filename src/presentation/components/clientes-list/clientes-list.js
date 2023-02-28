import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material'
import { remoteListClientesUseCase } from '../../../domain/useCases/remote-clientes-useCase'
import VisibilityIcon from '@mui/icons-material/Visibility';
const colums = [
    {
        id: 'name',
        label: 'Nome'
    }, {
        id: 'lastname',
        label: 'Sobrenome'
    }, {
        id: 'email',
        label: 'Email'
    }, {
        id: 'phonenumber',
        label: 'Telefone'
    }, {
        id: 'cpf',
        label: 'CPF'
    }, {
        id: 'options',
        label: 'Opções'
    }
]


export const ClientesList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchClientes = async () => {
            const response = await remoteListClientesUseCase()
            setData(response)
        }
        fetchClientes()
    }, [])
    return (
        <React.Fragment>
            <TableContainer>
                <Table sx={{ minWidth: 650, borderRadius: 5, border: 2, borderColor: '#A4D3EE' }} >
                    <TableHead>
                        <TableRow>
                            {colums.map((item, idx) => (
                                <TableCell key={idx}>{item.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.lastname}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phonenumber}</TableCell>
                                <TableCell>{item.cpf}</TableCell>
                                <TableCell align="left">
                                    <IconButton >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}