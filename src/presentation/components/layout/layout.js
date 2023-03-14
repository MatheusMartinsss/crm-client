import { Box, CssBaseline, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../../domain/context/useAuth";
import Header from "./header";
import { Sidebar } from "./sidebar";


const Layout = ({ children }) => {
    const { user } = useAuth()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen((state) => !state)

    return user ?
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} />
            <Sidebar open={open} handleDrawer={handleOpen} />
            <Box
                component='main'
                sx={{  flexGrow: 1, p: 3 }}>
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