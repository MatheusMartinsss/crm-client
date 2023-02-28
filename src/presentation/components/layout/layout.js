import { Box, Drawer, CssBaseline, Toolbar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useAuth } from "../../../domain/context/useAuth";
import Header from "./header";
import { menuItens } from './menuItens'
import { useNavigate } from "react-router-dom";
const drawerWidth = 240
const Layout = ({ children }) => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return user ?
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                {menuItens.map((item, idx) => (
                    <ListItem key={idx}>
                        <ListItemButton onClick={() => navigate(item.path)} >
                            <ListItemText>{item.label}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Drawer>
            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box >
        :
        <Box component="main" minHeight='100vh'>
            {children}
        </Box>
}

export default Layout