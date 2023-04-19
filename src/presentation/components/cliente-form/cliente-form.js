import React from 'react'
import { Button, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddClienteUseCase, remoteUpdateClienteUseCase } from '../../../domain/useCases/remote-clientes-useCase';
import { useCliente } from '../../../domain/context/cliente-context';
import LocationSelect from '../locationSelect';

const schema = yup.object({
    id: yup.mixed(),
    name: yup.string().required('Nome Obrigatorio!.'),
    lastname: yup.string().required('Nome Obrigatorio!.'),
    email: yup.string().email('Email invalido!').required(),
    phonenumber: yup.string(),
    pessoa_tipo: yup.string(),
    location: yup.object().shape({
        estado: yup.string(),
        uf: yup.string(),
        cidade: yup.string(),
    }),
    cpf: yup.string().required(),
})

export const ClienteForm = ({ handleModal, data }) => {
    const { register, handleSubmit, setValue, getValues, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data
    })
    let editMode = !!data
    let location = getValues('location')
    const { addCliente, updateCliente } = useCliente()
    const handleForm = async (form) => {
        if (editMode) {
            const newValue = getOnlyEditedFields(data, form)
            const response = await remoteUpdateClienteUseCase(form.id, newValue)
            updateCliente(form.id, response)
        } else {
            const response = await remoteAddClienteUseCase(form)
            addCliente(response)
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
    const handleLocation = (props) => {
        let newValue = { estado: props?.estado?.nome, uf: props?.estado?.sigla, cidade: props?.cidade }
        setValue('location', newValue)
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
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Tipo</FormLabel>
                    <Controller
                        control={control}
                        name='pessoa_tipo'
                        render={({ field: { onChange, ...props } }) => (
                            <RadioGroup
                                row
                                onChange={e => onChange(e.target.value)}
                                {...props}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="fisica" control={<Radio />} label="Fisica" />
                                <FormControlLabel value="juridica" control={<Radio />} label="Juridica" />
                            </RadioGroup>
                        )}
                    >

                    </Controller>
                </FormControl>
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
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Tamanho da Empresa</FormLabel>
                    <Controller
                        control={control}
                        name='empresa_tamanho'
                        render={({ field: { onChange, ...props } }) => (
                            <RadioGroup
                                row
                                onChange={e => onChange(e.target.value)}
                                {...props}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="pequena" control={<Radio />} label="pequena" />
                                <FormControlLabel value="media" control={<Radio />} label="media" />
                                <FormControlLabel value="grande" control={<Radio />} label="grande" />
                            </RadioGroup>
                        )}
                    >
                    </Controller>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <LocationSelect handleLocation={handleLocation} initialValue={location} />
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleModal} fullWidth variant='contained' color='error'>Cancelar</Button>
            </Grid>
            <Grid item xs={6}>
                <Button type='submit' fullWidth variant='contained' color='success'>Confirmar</Button>
            </Grid>
        </Grid >
    )
}