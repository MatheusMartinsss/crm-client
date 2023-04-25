import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { remoteAddNegociacaoUseCase, remoteUpdateNegociacaoUseCase } from '../../../domain/useCases/remote-negociacoes-useCase';
import AutoCompleteTagsAdd from '../SelectTag';
import AutoCompleteGroups from '../autoCompleteGroups';
import AutoCompleteClientes from '../autoCompleteClientes';
import { useNegociacao } from '../../../domain/context/useNegociacao';
import { formatENG } from '../../../helpers/date-format';
const schema = yup.object({
    id: yup.mixed(),
    name: yup.string().required('Titulo obrigatório'),
    description: yup.string(),
    cliente_id: yup.mixed(),
    group_id: yup.mixed().required('Selecione um grupo'),
    value: yup.mixed(),
    closeExpect: yup.date(),
    Tag: yup.object()
})

export const NegociacaoForm = ({ data, handleModal, onCreate, onUpdate }) => {
    const initialData = {
        id: data?.id || null,
        name: data?.name,
        description: data?.description,
        value: data?.value,
        closeExpect: formatENG(data?.closeExpect),
        Tag: data?.Tag,
        cliente_id: data?.Cliente?.id,
        group_id: data?.Group?.id
    }
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData || null
    })
    const { addNegociacao, updateNegociacao } = useNegociacao()
    let editMode = !!data
    let Tag = watch('Tag')
    const handleForm = async (formData) => {
        const body = {
            id: formData?.id,
            name: formData.name,
            description: formData?.description,
            value: formData?.value,
            closeExpect: formData?.closeExpect,
            Tag: formData?.Tag,
            cliente_id: formData?.cliente_id,
            group_id: formData?.group_id
        }
        if (editMode) {
            const newValue = getOnlyEditedFields(initialData, formData)
            await remoteUpdateNegociacaoUseCase(body.id, newValue).then((response) => {
                updateNegociacao(response.id, response)
                onUpdate(response)
                handleModal()
            })
        } else {
            await remoteAddNegociacaoUseCase(body).then((response) => {
                addNegociacao(response)
                onCreate(response)
                handleModal()
            })
        }
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
    const handleTags = (tag) => setValue('Tag', tag)

    const handleGroup = (groupId) => setValue('group_id', groupId)

    const handleCliente = (clienteId) => setValue('cliente_id', clienteId)

    return (
        <Grid container spacing={2} component='form' onSubmit={handleSubmit(handleForm)} >
            <Grid item xs={12} md={6}>
                <AutoCompleteGroups
                    handleGroup={handleGroup}
                    error={!!errors.group_id}
                    initialValue={data?.Group}
                    helperText={errors?.group_id?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6} >
                <TextField
                    {...register('value')}
                    fullWidth
                    placeholder='Valor'
                    error={!!errors.value}
                    helperText={errors?.value?.message}
                ></TextField>
            </Grid>
            <Grid item xs={12} md={6} >
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
                    handleChange={handleTags}
                    initialValue={Tag}
                />
            </Grid>
            <Grid item xs={6}>
                <Button fullWidth variant='contained' color='secondary'>Cancelar</Button>
            </Grid>
            <Grid item xs={6}>
                <Button type='submit' fullWidth variant='contained' color='primary'>Salvar</Button>
            </Grid>
        </Grid>
    )
}