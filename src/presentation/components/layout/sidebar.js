
import React from 'react'
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { menuItens } from './menuItens'
import { useNavigate } from "react-router-dom";
const drawerWidth = 240

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `80px`,

});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const Sidebar = ({ open, handleDrawer }) => {
    const navigate = useNavigate()
    return (
        <Drawer
            variant='permanent'
            open={open}
            onPointerEnter={handleDrawer}
            onPointerLeave={handleDrawer}
        >
            {menuItens.map((item, idx) => (
                <ListItem key={idx}>
                    <ListItemButton onClick={() => navigate(item.path)} >
                        {open ? (
                            <>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.label}</ListItemText>
                            </>
                        ) : (
                            <>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                            </>
                        )}
                    </ListItemButton>
                </ListItem>
            ))}
        </Drawer>
    )
}
