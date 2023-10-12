import React, { useEffect, useState } from 'react'
import { Table, TableContainer,  TableRow, TableCell, TableBody, IconButton, Paper } from '@mui/material'
import { remoteFetchUsers, remoteFetchUser } from '../../../domain/useCases/remote-user-useCase'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UserModal } from '../user-form/user-modal';
import { useUsers } from '../../../domain/context/users-context';
import { CTableCellHeader, TableHeader } from '../custom-styles/custom-styles';
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
            <TableContainer component={Paper} sx={{ height: 650 }} >
                <Table >
                    <TableHeader>
                        <TableRow>
                            {colums.map((item, idx) => (
                                <CTableCellHeader key={idx}>{item.label}</CTableCellHeader>
                            ))}
                        </TableRow>
                    </TableHeader>
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