import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { logout } from '../../hooks/logout'
import { useAuth } from '../../../domain/context/useAuth'
const Header = () => {
    const { setUser, user } = useAuth()
    const handleLogout = () => {
        logout(setUser)
    }
    return (
        <AppBar position='static'>
            <Toolbar disableGutters >
                <Box display='flex' justifyContent='space-between' flexGrow={1} padding={2}>
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
            </Toolbar>
        </AppBar>
    )
}

export default Header