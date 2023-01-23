import React from 'react'
import { Grid, TextField, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object({
    email: yup.string().email('Digite um endereço de email valido!.').required('Digite um endereço de email!.'),
    password: yup.string().required('Preencha este campo!')
})
const AuthForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    return (
        <Grid container spacing={1} component='form' onSubmit={handleSubmit(onSubmit)} >
            <Grid item xs={12}>
                <Typography variant='h4' textAlign='center'>CRM - Client</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    {...register('email')}
                    label='Email'
                    margin="normal"
                    fullWidth type='email'
                    error={!!errors.email}
                    helperText={errors?.email?.message}>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    {...register('password')}
                    label='Senha'
                    margin="normal"
                    fullWidth
                    type='password'
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                >
                </TextField>
            </Grid>
            <Grid item xs={12} sx = {{marginTop: '50px'}}>
                <Button size='large' variant="contained" fullWidth type='submit'>Entrar</Button>
            </Grid>
        </Grid>
    )
}

export default AuthForm