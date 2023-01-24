import React from 'react'
import { Grid, TextField, Button, Typography, InputAdornment} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
                    margin="normal"
                    fullWidth type='email'
                    variant='outlined'
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            paddingLeft: 0,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                sx={{
                                    padding: "27.5px 14px",
                                    backgroundColor: (theme) => theme.palette.divider,
                                    borderTopLeftRadius: (theme) => theme.shape.borderRadius + "px",
                                    borderBottomLeftRadius: (theme) => theme.shape.borderRadius + "px"
                                }}
                                position='start'
                                variant='standard'>
                                <MailOutlineIcon />
                            </InputAdornment>
                        )
                    }}

                >
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    {...register('password')}
                    margin="normal"
                    fullWidth
                    type='password'
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            paddingLeft: 0,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment sx={{
                                padding: "27.5px 14px",
                                backgroundColor: (theme) => theme.palette.divider,
                                borderTopLeftRadius: (theme) => theme.shape.borderRadius + "px",
                                borderBottomLeftRadius: (theme) => theme.shape.borderRadius + "px"
                            }}
                                position='start'
                                variant='standard'>
                                <LockOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                </TextField>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '25px' }}>
                <Button size='large' variant="contained" fullWidth type='submit'>Entrar</Button>
            </Grid>
        </Grid>
    )
}

export default AuthForm