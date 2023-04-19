import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { UserModal } from '../../components/user-form/user-modal'
import { UserList } from '../../components/user-list/user-list'
import Layout from '../../components/layout/layout'

export const UserView = () => {
    const [open, setOpen] = useState(false)

    const handleModal = () => setOpen((state) => !state)
    return (
        <Layout>
            <Box display='flex' justifyContent='space-between' flexDirection='column' gap={1}>
                <Button onClick={handleModal} variant='contained'>+ Usuario</Button>
                <UserList />
                <UserModal handleModal={handleModal} open={open} />
            </Box>
        </Layout>
    )
}