import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { remoteListGroupsUseCase, remoteFetchGroupUseCase } from '../../../domain/useCases/remote-groups-useCase'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GroupModal } from '../group-form/group-modal';
import { useGroup } from '../../../domain/context/group-context';
const colums = [
    {
        id: 'name',
        label: 'Nome'
    }, {
        id: 'description',
        label: 'Descrição'
    }, {
        id: 'options',
        label: 'Opções'
    }
]

export const GroupsList = () => {
    const { getGroups, setGroups } = useGroup()
    let data = getGroups()
    const [groupSelected, setGroupSelected] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await remoteListGroupsUseCase()
            setGroups(response)
        }
        fetchData()
        // eslint-disable-next-line
    }, [])
    const fetchGroup = async (id) => {
        const response = await remoteFetchGroupUseCase(id)
        setGroupSelected(response)
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
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell align="left">
                                    <IconButton onClick={() => fetchGroup(item.id)} >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <GroupModal open={open} handleModal={handleModal} data={groupSelected} />
        </React.Fragment>
    )
}

