import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteListClientesUseCase } from '../../../domain/useCases/remote-clientes-useCase';
import { remoteAddNegociacaoUseCase } from '../../../domain/useCases/remote-negociacoes-useCase';
import AutoCompleteHookForm from '../autoCompleteHookForm';
import AutoCompleteTagsAdd from '../autoCompleteTagsAdd';
import AutoCompleteGroups from '../autoCompleteGroups';
import { useNegociacao } from '../../../domain/context/useNegociacao';
const schema = yup.object({
    title: yup.string().required('Titulo obrigatório'),
    description: yup.string(),
    cliente_id: yup.mixed(),
    group_id: yup.mixed().required('Selecione um grupo'),
    value: yup.mixed(),
    closeExpect: yup.date(),
    tags: yup.array()
})

export const NegociacaoForm = () => {
    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({ resolver: yupResolver(schema) })
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(false)
    const { addNegociacao } = useNegociacao()
    const handleForm = async (data) => {
        const body = {
            name: data.title,
            description: data?.description,
            value: data?.value,
            closeExpect: data?.closeExpect,
            tags: data?.tags,
            cliente_id: data?.cliente?.id,
            group_id: data?.group_id
        }
        await remoteAddNegociacaoUseCase(body)
            .then((response) => {
                addNegociacao(response)
            })
    }
    const handleClientes = async () => {
        if (!clientes.length) {
            await remoteListClientesUseCase()
                .then((response) => {
                    setLoading(true)
                    setClientes(response)
                }).finally(() => {
                    setLoading(false)
                })
        }
    }
    const handleTags = (tags) => setValue('tags', tags.map((item) => item.id))
    const handleGroup = (groupId) => setValue('group_id', groupId)
    return (
        <Grid container spacing={2} component='form' onSubmit={handleSubmit(handleForm)} >
            <Grid item xs={12}>
                <AutoCompleteGroups
                    handleGroup={handleGroup}
                    error={!!errors.group_id}
                    helperText={errors?.group_id?.message}
                />
            </Grid>
            <Grid item xs={12} >
                <TextField
                    {...register('title')}
                    fullWidth
                    placeholder='Titulo'
                    error={!!errors.title}
                    helperText={errors.title?.message}
                >
                </TextField>
            </Grid>
            <Grid item xs={12} >
                <TextField
                    {...register('description')}
                    fullWidth
                    placeholder='Descrição'
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                >
                </TextField>
            </Grid>
            <Grid item xs={12} >
                <AutoCompleteHookForm
                    options={clientes}
                    control={control}
                    name='cliente'
                    loading={loading}
                    getOptionLabel={(item) => item.name}
                    renderOption={(props, option, index) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option === value || option.id === value.id
                    }
                    renderInput={(params) => <TextField onClick={handleClientes} fullWidth  {...params} />}
                    defaultValue={null}
                />
            </Grid>
            <Grid item xs={12} >
                <TextField
                    {...register('value')}
                    fullWidth
                    placeholder='Valor'
                    error={!!errors.value}
                    helperText={errors?.value?.message}
                ></TextField>
            </Grid>
            <Grid item xs={12} >
                <TextField
                    {...register('closeExpect')}
                    type='date'
                    fullWidth
                    placeholder='Fechamento esperado'
                    error={!!errors.date}
                    helperText={errors?.date?.message}
                ></TextField>
            </Grid>
            <Grid item xs={12}>
                <AutoCompleteTagsAdd
                    handleTag={handleTags}
                />
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