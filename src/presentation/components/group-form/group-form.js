import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddGroupUseCase } from '../../../domain/useCases/remote-groups-useCase';

const schema = yup.object({
    id: yup.mixed(),
    name: yup.string().required('Nome Obrigatorio!.').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Nome invalido!'),
    description: yup.string().required('Nome Obrigatorio!.').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Sobre nome invalido!'),
})

export const GroupForm = ({ handleModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const handleForm = async (data) => {
        await remoteAddGroupUseCase(data)
        handleModal()
    }
    return (
        <Grid container spacing={2} component='form' onSubmit={handleSubmit(handleForm)}>
            <Grid item xs={12}>
                <TextField fullWidth error={!!errors.name} helperText={errors?.name?.message} {...register('name')} placeholder='Nome'></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth error={!!errors.description} helperText={errors?.name?.message} {...register('description')} placeholder='Descrição'></TextField>
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth variant='contained' color='error' onClick={handleModal}>Cancelar</Button>
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth type='submit' variant='contained' color='success'>Confirmar</Button>
            </Grid>
        </Grid>
    )
}