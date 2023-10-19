
import React, { useState } from 'react'
import { Box, Paper, Typography, styled, Stack } from "@mui/material";
import { menuItens } from './menuItens'
import { MenuItem } from './menuItem';

const ExpandedSideBar = styled(Paper)(() => ({
    width: '100px', // Ajuste a largura conforme necessário
    backgroundColor: '#1C2536', // Cor de fundo agradável
    transition: 'all 0.1s', // Transição suave de largura ao abrir/fechar
    position: 'fixed',
    zIndex: 2500,
    height: '100%',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    ":hover": {
        width: '200px',
        cursor: 'pointer',
    }
}))


export const Sidebar = () => {
    const [open, setOpen] = useState(false)

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };
    return (
        <ExpandedSideBar
            open={open}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box sx={{ padding: 2, textAlign: 'center' }} display='flex' height='80px'>
                <Typography fontSize={20} fontWeight='medium'>CRM</Typography>
            </Box>
            <Box>
                {menuItens.map((item, idx) => {
                    const isActive = item.path === window.location.pathname
                    return (
                        <Stack
                            key={idx}
                            component='ul'
                            spacing={0.5}
                            sx={{
                                listStyle: 'none',
                                p: 0,
                                m: 0,
                            }}
                        >
                            <MenuItem Icon={item.icon} label={item.label} path={item.path} active={isActive} open={open} />
                        </Stack>

                    )
                })}
            </Box>
        </ExpandedSideBar >
    )
}
