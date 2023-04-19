
import React from 'react'

import { Box, Divider, ListItemIcon, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { menuItens } from './menuItens'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";



export const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{ display: 'flex' }}
        >
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: { main: 'rgb(102, 157, 246)' },
                        background: { paper: 'rgb(5, 30, 52)' },
                    },
                })}
            >
                <Paper elevation={0} sx={{ maxWidth: 300, minHeight: '100vh', flexDirection: 'column' }}>
                    <Box sx={{ padding: 2, textAlign: 'center' }}>
                        <Typography fontSize={20} fontWeight='medium'>CRM-Client</Typography>
                    </Box>
                    <Divider />
                    {menuItens.map((item, idx) => (
                        <ListItem key={idx} >
                            <ListItemButton
                                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                onClick={() => navigate(item.path)} >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label}
                                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', color: 'white' }}>{item.label}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Paper>
            </ThemeProvider>
        </Box>
    )
}
