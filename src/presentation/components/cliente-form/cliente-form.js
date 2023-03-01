import React from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddClienteUseCase } from '../../../domain/useCases/remote-clientes-useCase';
import { useCliente } from '../../../domain/context/cliente-context';
const schema = yup.object({
    id: yup.mixed(),
    name: yup.string().required('Nome Obrigatorio!.').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Nome invalido!'),
    lastname: yup.string().required('Nome Obrigatorio!.').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Sobre nome invalido!'),
    email: yup.string().email('Email invalido!').required(),
    phonenumber: yup.string(),
    cpf: yup.string().required(),
})

export const ClienteForm = ({ handleModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const { addCliente } = useCliente()
    const handleForm = async (data) => {
        await remoteAddClienteUseCase(data).then((response) => {
            addCliente(response)
            handleModal()
        })
    }
    return (
        <Grid container spacing={2} component='form' onSubmit={handleSubmit(handleForm)}>
            <Grid item xs={6} md={12}>
                <TextField
                    {...register('name')}
                    fullWidth
                    placeholder='Nome'
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            </Grid>
            <Grid item xs={6} md={12}>
                <TextField
                    {...register('lastname')}
                    fullWidth
                    placeholder='Sobrenome'
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    {...register('email')}
                    fullWidth
                    placeholder='Email'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    {...register('phonenumber')}
                    fullWidth
                    placeholder='Telefone'
                    error={!!errors.phonenumber}
                    helperText={errors.phonenumber?.message}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    {...register('cpf')}
                    fullWidth
                    placeholder='CPF'
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                />
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleModal} fullWidth variant='contained' color='error'>Cancelar</Button>
            </Grid>
            <Grid item xs={6}>
                <Button type='submit' fullWidth variant='contained' color='success'>Confirmar</Button>
            </Grid>
        </Grid>
    )
}