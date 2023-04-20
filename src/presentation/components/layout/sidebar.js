
import React from 'react'
import { Box, ListItemIcon, ListItem, ListItemButton, ListItemText, Paper, Typography, Divider } from "@mui/material";
import { menuItens } from './menuItens'
import { useNavigate } from "react-router-dom";


export const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{ display: 'flex' }}
        >
            <Paper elevation={2} sx={{ maxWidth: 300, minHeight: '100vh', flexDirection: 'column' }}>
                <Box sx={{ padding: 2, textAlign: 'center' }} display='flex' height='80px'>
                    <Typography fontSize={20} fontWeight='medium'>CRM-Client</Typography>
                </Box>
          
                {menuItens.map((item, idx) => (
                    <ListItem key={idx} >
                        <ListItemButton
                            onClick={() => navigate(item.path)} >
                            <ListItemIcon >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}>{item.label}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Paper>
        </Box>
    )
}
