import React from 'react'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddUser, remoteUpdateUser } from '../../../domain/useCases/remote-user-useCase';
import { useUsers } from '../../../domain/context/users-context';
const schema = yup.object({
    id: yup.mixed(),
    name: yup.string().required('Nome Obrigatorio!.'),
    email: yup.string().required('Email Obrigatorio!.'),
    password: yup.string().required(),
    role: yup.string()
})

export const UserForm = ({ handleModal, data }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data
    })
    let editMode = !!data
    const { updateUsers, addUsers } = useUsers()
    const handleForm = async (form) => {
        if (editMode) {
            const newValue = getOnlyEditedFields(data, form)
            const response = await remoteUpdateUser(form.id, newValue)
            updateUsers(form.id, response)
        } else {
            const response = await remoteAddUser(form)
            addUsers(response)
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