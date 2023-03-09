import React from 'react'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddUser } from '../../../domain/useCases/remote-user-useCase';
const schema = yup.object({
    id: yup.mixed(),
    name: yup.string().required('Nome Obrigatorio!.').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Nome invalido!'),
    email: yup.string().required('Email Obrigatorio!.'),
    password: yup.string().required(),
    role: yup.string()
})

export const UserForm = ({ handleModal }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    })
    const handleForm = async (data) => {
        const response = await remoteAddUser(data)
        handleModal()
    }
    return (
        <Grid container spacing={2} component='form' onSubmit={handleSubmit(handleForm)} >
            <Grid item xs={12}>
                <TextField fullWidth error={!!errors.name} helperText={errors?.name?.message} {...register('name')}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth error={!!errors.email} helperText={errors?.email?.message} {...register('email')}></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField type='password' fullWidth error={!!errors.password} helperText={errors?.password?.message} {...register('password')}></TextField>
            </Grid>
            <Grid item xs={12}>
                <Controller
                    name='role'
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            {...field}
                            variant='outlined'
                            fullWidth
                            label='Role'
                        >
                            <MenuItem value=''>Selecione uma role</MenuItem>
                            <MenuItem value='admin'>admin</MenuItem>
                            <MenuItem value='vendedor'>vendedor</MenuItem>
                        </Select>
                    )}
                >
                </Controller>
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth variant='contained' color='error'>Cancelar</Button>
            </Grid>
            <Grid item xs={6}>
                <Button type='submit' fullWidth variant='contained' color='success'>Salvar</Button>
            </Grid>
        </Grid>
    )
}