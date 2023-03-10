import { Box } from "@mui/material";
import React, { useState } from "react";
import AuthForm from "./components/auth-form";
import { authUseCase } from "../../../domain/useCases/remote-auth-useCase";
import { useAuth } from "../../../domain/context/useAuth";
import { setToken } from "../../hooks/acess-token";

export const AuthView = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setUser } = useAuth()
    const onSubmit = async (data) => {
        setError('')
        setLoading(true)
        await authUseCase(data.email, data.password)
            .then((response) => {
                const user = setToken(response)
                setUser(user)
            }).catch((error) => {
                setError(error)
            }).finally(() => setLoading(false))
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
                sx={{
                    maxWidth: '450px',
                    heigh: '550px',
                    padding: '30px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '5px'
                }}
            >
                <AuthForm
                    onSubmit={onSubmit}
                    loading={loading}
                    error={error}
                />
            </Box>
        </Box>
    )
}

