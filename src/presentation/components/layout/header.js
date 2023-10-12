import { Avatar, Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles';
import { common } from '@mui/material/colors'
import React from 'react'
import { logout } from '../../hooks/logout'
import { useAuth } from '../../../domain/context/useAuth'


const Header = () => {
    const { setUser, user } = useAuth()
    const handleLogout = () => logout(setUser)

    return (
        <Box
            component='header'
            sx={{
                backdropFilter: 'blur(6px)',
                position: 'sticky',
                backgroundColor: alpha(common.white, 0.5),
                width: '100%',
                display: 'flex',
                height: 64,
                zIndex: (theme) => theme.zIndex.appBar,
                boxShadow: "0 2px 4px rgba(128, 128, 128, 0.2)"
            }}
        >
            <Box display='flex' justifyContent='flex-end' alignItems='center' gap={2} flexGrow={1} padding={2}>
                <Typography variant='h6' noWrap>
                    Bem vindo, {user.name}</Typography>
                <Avatar sizes='md'></Avatar>
            </Box>
        </Box>
    )
}

export default Header