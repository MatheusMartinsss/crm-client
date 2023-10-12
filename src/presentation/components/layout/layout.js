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
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CssBaseline />
                <Box width='100px'>
                    <Sidebar />
                </Box>
                <Box sx={{ flex: 1, gap: 5, display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box paddingLeft={6} paddingRight={6} flex={1}>
                        {children}
                    </Box>
                </Box>
            </Box >
        </ThemeProvider>
    )

}

export default Layout