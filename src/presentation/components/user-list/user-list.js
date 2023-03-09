import React, { useEffect, useState } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { remoteFetchUsers } from '../../../domain/useCases/remote-user-useCase'

const colums = [
    {
        id: 'name',
        label: 'Nome'
    }, {
        id: 'email',
        label: 'Email'
    }
]

export const UserList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await remoteFetchUsers()
            setData(response)
        }
        fetchData()
    }, [])
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650, borderRadius: 5, border: 2, borderColor: '#A4D3EE' }}>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}