import React, { useEffect, useState } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Paper } from '@mui/material'
import { remoteFetchUsers, remoteFetchUser } from '../../../domain/useCases/remote-user-useCase'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UserModal } from '../user-form/user-modal';
import { useUsers } from '../../../domain/context/users-context';
const colums = [
    {
        id: 'name',
        label: 'Nome'
    }, {
        id: 'email',
        label: 'Email'
    }, {
        id: 'options',
        label: 'Opções'
    }
]

export const UserList = () => {
    const [userSelected, setUserSelected] = useState(null)
    const [open, setOpen] = useState(false)
    const { getUsers, setUsers } = useUsers()
    let data = getUsers()
    useEffect(() => {
        const fetchData = async () => {
            const response = await remoteFetchUsers()
            setUsers(response)
        }
        fetchData()
        // eslint-disable-next-line
    }, [])

    const fetchUser = async (id) => {
        const response = await remoteFetchUser(id)
        setUserSelected(response)
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
                        {data.map((item) => (
                            <TableRow>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell align="left">
                                    <IconButton onClick={() => fetchUser(item.id)} >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserModal handleModal={handleModal} open={open} data={userSelected} />
        </React.Fragment>
    )
}