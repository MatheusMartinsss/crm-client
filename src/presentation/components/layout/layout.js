import { Box } from "@mui/material";
import React from "react";
import { useAuth } from "../../../domain/context/useAuth";
import Header from "./header";

const Layout = ({ children }) => {
    const { user } = useAuth()
    return user ?
        <Box
            component="main"
            minHeight='100vh'
        >
            <Header />
            <Box sx={{ flexGrow: '1', padding: 5 }}>
                {children}
            </Box>
        </Box >
        :
        <Box
            component="main"
            minHeight='100vh'
        >
            {children}
        </Box>
}

export default Layout