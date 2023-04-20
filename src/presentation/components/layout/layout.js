import { Box, CssBaseline } from "@mui/material";
import React from "react";
import Header from "./header";
import { Sidebar } from "./sidebar";
import { ThemeProvider } from '@mui/material/styles';
import { DarkTheme } from "./theme-options";

const Layout = ({ children }) => {
    return (
        <ThemeProvider
            theme={DarkTheme}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CssBaseline />
                <Sidebar />
                <Box sx={{ flex: 1, gap: 5, display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box paddingLeft={2} paddingRight={2} flex={1}>
                        {children}
                    </Box>
                </Box>
            </Box >
        </ThemeProvider>
    )

}

export default Layout