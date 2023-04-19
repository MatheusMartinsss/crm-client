import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { GroupsList } from '../../components/groups-list/groups-list'
import { GroupModal } from '../../components/group-form/group-modal'
import Layout from '../../components/layout/layout'

export const GroupsView = () => {
    const [open, setOpen] = useState(false)

    const handleModal = () => setOpen((state) => !state)
    return (
        <Layout>
            <Box display='flex' justifyContent='space-between' flexDirection='column' gap={1}>
                <Button onClick={handleModal} variant='contained'>Novo Grupo</Button>
                <GroupsList />
                <GroupModal open={open} handleModal={handleModal} />
            </Box>
        </Layout>
    )
}

