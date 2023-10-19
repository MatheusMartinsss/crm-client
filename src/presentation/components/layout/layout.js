import { Box, CssBaseline } from "@mui/material";
import React from "react";
import Header from "./header";
import { Sidebar } from "./sidebar";
import { ThemeProvider } from '@mui/material/styles';
import { LightTheme } from "./theme-options";

const Layout = ({ children }) => {
    return (
        <ThemeProvider
            theme={LightTheme}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
                <CssBaseline />
                <Box width={100}>
                    <Sidebar />
                </Box>
                <Box display='flex' flexDirection='column' flexGrow={1}>
                    <Header />
                    <Box sx={{
                        display: 'flex',
                        padding: '40px 40px 0px 40px',
                        maxWidth: 'calc(100vw - 100px)',
                        flexGrow: 1
                    }}>
                        {children}
                    </Box>
                </Box>
            </Box >
        </ThemeProvider>
    )

}

export default Layout