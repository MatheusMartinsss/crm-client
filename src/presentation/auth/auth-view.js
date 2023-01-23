import { Box } from "@mui/material";
import React from "react";
import AuthForm from "./components/auth-form";
const AuthView = () => {
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#c0d0e6' }}
        >
            <Box
                display='flex'
                sx={{ maxWidth: '450px', heigh: '550px', padding: '30px', backgroundColor: '#FFFFFF', borderRadius: '5px' }}
            >
                <AuthForm onSubmit={onSubmit} />
            </Box>
        </Box>
    )
}

export default AuthView