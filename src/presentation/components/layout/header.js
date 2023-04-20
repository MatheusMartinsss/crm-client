import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { logout } from '../../hooks/logout'
import { useAuth } from '../../../domain/context/useAuth'


const Header = () => {
    const { setUser, user } = useAuth()
    const handleLogout = () => logout(setUser)

    return (
        <Box display='flex' justifyContent='space-between' flexDirection='column' height='80px'  >
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography
                    variant='h6'
                    component='div'
                    noWrap
                >
                    CRM-Client
                </Typography>
                <Stack display='flex' flexDirection='row' alignItems='center' gap={1} >
                    <Typography variant='h6' noWrap>
                        Bem vindo, {user.name}</Typography>
                    <Button onClick={handleLogout} variant='contained'>Logout</Button>
                </Stack>
            </Box>
            <Divider />
        </Box>
    )
}

export default Header