import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material'
import { remoteListClientesUseCase, remotefetchClienteUseCase } from '../../../domain/useCases/remote-clientes-useCase'
import { useCliente } from '../../../domain/context/cliente-context';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ClienteModal } from '../cliente-form/cliente-modal';
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
    const { getClientes, setClientes } = useCliente()
    const [clientSelected, setClienteSelected] = useState({})
    const [open, setOpen] = useState(false)
    let data = getClientes()
    useEffect(() => {
        const fetchClientes = async () => {
            const response = await remoteListClientesUseCase()
            setClientes(response)
        }
        fetchClientes()
        // eslint-disable-next-line
    }, [])
    const fetchCliente = async (id) => {
        const response = await remotefetchClienteUseCase(id)
        setClienteSelected(response)
        handleModal()
    }
    const handleModal = () => setOpen((state) => !state)
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table >
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
                                    <IconButton onClick={() => fetchCliente(item.id)} >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ClienteModal open={open} handleModal={handleModal} data={clientSelected} />
        </React.Fragment>
    )
}