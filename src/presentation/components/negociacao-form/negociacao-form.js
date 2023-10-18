import { Button, Grid, TextField, styled, Typography, Box } from '@mui/material'
import React from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { createNegociacao } from '../../../domain/useCases/remote-negociacoes-useCase';
import AutoCompleteGroups from '../autoCompleteGroups';
import AutoCompleteClientes from '../autoCompleteClientes';
import { TextEditor } from '../TextEditor/TextEditor';
import { PrioritySelect } from '../prioritySelect';
import { enqueueSnackbar } from 'notistack';

const CustomLabel = styled(Typography)({
    color: '#333333', // Cor personalizada
    fontSize: '1.0rem', // Tamanho da fonte maior
    fontWeight: 'bold', // Texto em negrito
    padding: '8px 0', // Espaçamento superior e inferior
    display: 'inline-block', // Para garantir que a borda não ocupe toda a largura
    cursor: 'pointer', // Efeito de cursor ao passar o mouse
})

const CustomTextField = styled(TextField)({

})


const schema = yup.object({
    name: yup.string().required('Titulo obrigatório'),
    description: yup.mixed(),
    Cliente: yup.object(),
    Group: yup.mixed().required('Selecione um grupo'),
    prioridade: yup.string(),
    closeExpect: yup.date(),
})

export const NegociacaoForm = ({ onCreate }) => {

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

    const Cliente = watch('Cliente')
    const description = watch('description')
    const group = watch('Group')
    const prioridade = watch('prioridade')

    const onSubmit = async (data) => {
        await createNegociacao(data)
            .then((response) => {
                enqueueSnackbar('Negociacao criada com sucesso',
                    { variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'bottom' } }
                )
                clearForm()
            }).catch((error) => {
                enqueueSnackbar('Erro, entre em contato com o suporte!',
                    { variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'bottom' } }
                )
            })
    }

    const onEditorChange = (editorState) => setValue('description', editorState)
    const handleGroup = (group) => setValue('Group', group)
    const handleCliente = (cliente) => setValue('Cliente', cliente)
    const handlePriority = (e) => setValue('prioridade', e.target.value)

    const clearForm = () => {
        setValue('description', null)
        setValue('Group', null)
        setValue('Cliente', null)
        setValue('prioridade', '')
        reset()
        return
    }

    return (
        <Grid container spacing={2} component='form' onSubmit={handleSubmit(onSubmit)} >
            <Grid item xs={12} md={12}>
                <Grid item xs direction='column'>
                    <Grid item xs>
                        <CustomLabel>
                            Titulo
                        </CustomLabel>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            {...register('name')}
                            fullWidth
                            placeholder='Titulo'
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        >
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item xs direction='column'>
                    <Grid item xs>
                        <CustomLabel>
                            Etapa
                        </CustomLabel>
                    </Grid>
                    <Grid item xs>
                        <AutoCompleteGroups
                            value={group || null}
                            onChange={handleGroup}
                            renderInput={(params) => (
                                <CustomTextField
                                    name="Group"
                                    {...params}
                                >
                                </CustomTextField>
                            )}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item xs direction='column'>
                    <Grid item xs>
                        <CustomLabel>
                            Prioridade
                        </CustomLabel>
                    </Grid>
                    <Grid item xs>
                        <PrioritySelect
                            fullWidth
                            value={prioridade || ''}
                            onChange={handlePriority}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
                <Grid item xs direction='column'>
                    <Grid item xs>
                        <CustomLabel>
                            Descrição
                        </CustomLabel>
                    </Grid>
                    <Grid item xs>
                        <Box>
                            <TextEditor
                                onChange={onEditorChange}
                                value={description}
                                style={{
                                    height: 200
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={5} >
                <Grid item xs direction='column'>
                    <Grid item xs>
                        <CustomLabel>Cliente</CustomLabel>
                    </Grid>
                    <Grid item xs>
                        <AutoCompleteClientes
                            handleCliente={handleCliente}
                            error={!!errors.cliente_id}
                            helperText={errors?.cliente_id?.message}
                            initialValue={Cliente}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} >
                <Grid item xs direction='column'>
                    <Grid item xs>
                        <CustomLabel>Valor</CustomLabel>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            {...register('value')}
                            fullWidth
                            placeholder='Valor'
                            error={!!errors.value}
                            helperText={errors?.value?.message}
                        ></TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} >
                <Grid item xs direction='column'>
                    <Grid item xs>
                        <CustomLabel>Prev. Fechamento</CustomLabel>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            {...register('closeExpect')}
                            type='date'
                            fullWidth
                            placeholder='Fechamento esperado'
                            error={!!errors.date}
                            helperText={errors?.date?.message}
                        ></TextField>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Button fullWidth variant='contained' color='inherit'>Cancelar</Button>
            </Grid>
            <Grid item xs={6}>
                <Button type='submit' fullWidth variant='contained' color='primary'>Salvar</Button>
            </Grid>
        </Grid>
    )
}