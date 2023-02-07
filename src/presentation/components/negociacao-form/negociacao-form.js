import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddNegociacaoUseCase } from '../../../domain/useCases/remote-negociacoes-useCase';
import AutoCompleteTagsAdd from '../autoCompleteTagsAdd';
import AutoCompleteGroups from '../autoCompleteGroups';
import AutoCompleteClientes from '../autoCompleteClientes';
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

export const NegociacaoForm = ({ data }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const { addNegociacao } = useNegociacao()
    let editMode = !!data
    const handleForm = async (data) => {
        const body = {
            name: data.title,
            description: data?.description,
            value: data?.value,
            closeExpect: data?.closeExpect,
            tags: data?.tags,
            cliente_id: data?.cliente_id,
            group_id: data?.group_id
        }
        await remoteAddNegociacaoUseCase(body)
            .then((response) => {
                addNegociacao(response)
            })
    }

    const handleTags = (tags) => setValue('tags', tags.map((item) => item.id))

    const handleGroup = (groupId) => setValue('group_id', groupId)

    const handleCliente = (clienteId) => setValue('cliente_id', clienteId)

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
                <AutoCompleteClientes
                    handleCliente={handleCliente}
                    error={!!errors.cliente_id}
                    helperText={errors?.cliente_id?.message}
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