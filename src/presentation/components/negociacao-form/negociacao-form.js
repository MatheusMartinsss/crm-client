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
    name: yup.string().required('Titulo obrigatório'),
    description: yup.string(),
    cliente_id: yup.mixed(),
    group_id: yup.mixed().required('Selecione um grupo'),
    value: yup.mixed(),
    closeExpect: yup.date(),
    tags: yup.array()
})

export const NegociacaoForm = ({ data }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data || null
    })
    const { addNegociacao } = useNegociacao()
    let editMode = !!data
    const handleForm = async (formData) => {
        const body = {
            name: formData.name,
            description: formData?.description,
            value: formData?.value,
            closeExpect: formData?.closeExpect,
            tags: formData?.tags,
            cliente_id: formData?.cliente_id,
            group_id: formData?.group_id
        }
        if (editMode) {

        } else {
            await remoteAddNegociacaoUseCase(body).then((response) => {
                addNegociacao(response)
            })
        }
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
                    initialValue={data?.Group}
                    helperText={errors?.group_id?.message}
                />
            </Grid>
            <Grid item xs={12} >
                <TextField
                    {...register('name')}
                    fullWidth
                    placeholder='Titulo'
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                    initialValue={data?.Cliente}
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
                    initialValue={data?.Tags}
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