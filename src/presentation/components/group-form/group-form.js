import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddGroupUseCase, remoteUpdateGroupUseCase } from '../../../domain/useCases/remote-groups-useCase';

const schema = yup.object({
    id: yup.mixed(),
    name: yup.string().required('Nome Obrigatorio!.'),
    description: yup.string().required('Nome Obrigatorio!.'),
})

export const GroupForm = ({ handleModal, data }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data
    })
    let editMode = !!data
    const handleForm = async (form) => {
        if (editMode) {
            const newValue = getOnlyEditedFields(data, form)
            await remoteUpdateGroupUseCase(form.id, newValue)
        } else {
            await remoteAddGroupUseCase(form)
        }
        handleModal()
    }
    const getOnlyEditedFields = (initialValue, value) => {
        let editedFields = {}
        for (let field in initialValue) {
            if (initialValue[field] !== value[field]) {
                editedFields = { ...editedFields, [field]: value[field] }
            }
        }
        return editedFields
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