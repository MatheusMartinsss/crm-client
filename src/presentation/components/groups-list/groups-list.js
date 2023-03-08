import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { remoteListGroupsUseCase } from '../../../domain/useCases/remote-groups-useCase'

const colums = [
    {
        id: 'name',
        label: 'Nome'
    }, {
        id: 'description',
        label: 'Descrição'
    },
]

export const GroupsList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await remoteListGroupsUseCase()
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
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

