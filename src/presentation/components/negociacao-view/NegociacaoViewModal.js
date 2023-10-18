import { Dialog, Box, DialogContent, Typography, styled, TextField, Grid, Avatar } from "@mui/material"
import { useState } from "react"
import AutoCompleteGroups from "../autoCompleteGroups"
import { PrioritySelect } from "../prioritySelect"
import { DateInput } from "./components/dateInput"
import 'quill/dist/quill.snow.css';
const CTextField = styled(TextField)(({ theme }) => ({
    cursor: 'text',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: 'none'
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },

    },
}))

const TitleBox = styled(Box)(({ theme }) => ({
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },
    height: '50px',
    alignContent: 'center',
    display: 'flex',


}))
const DescriptionBox = styled(Box)(({ theme }) => ({
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },



}))

const CommentTextField = styled(TextField)(({ theme }) => ({
    cursor: 'text',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: 'none'
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            height: '80px',
            width: '300px'
        },
    },
}))

const CustomLabel = styled(Typography)({
    color: '#333333', // Cor personalizada
    fontSize: '1.0rem', // Tamanho da fonte maior
    fontWeight: 'bold', // Texto em negrito
    padding: '8px 0', // Espaçamento superior e inferior
    display: 'inline-block', // Para garantir que a borda não ocupe toda a largura
    cursor: 'pointer', // Efeito de cursor ao passar o mouse
})

CTextField.defaultProps = {
    inputProps: {
        style: {
            fontFamily: 'Rubik',
            fontWeight: 700,
            fontSize: 30,
        }
    }
}

const CustomInputDate = styled(DateInput)({
    backgroundColor: '#f0f0f0',
    width: 150,
    borderRadius: 6,
    "& fieldset": {
        border: 'none',
    },
    '&:hover fieldset': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },
})
CustomInputDate.defaultProps = {
    size: 'small',
}

const CustomGroupTextField = styled(TextField)({
    backgroundColor: '#f0f0f0',
    width: 150,
    borderRadius: 6,
    "& fieldset": {
        border: 'none',
    },
    '&:hover fieldset': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },
})
CustomGroupTextField.defaultProps = {
    size: 'small'
}

const textFieldStyles = {
    backgroundColor: 'lightblue',
    color: 'darkblue',
    border: 'none',
    "& fieldset": {
        border: 'none',
    },
};

const CustomPrioritySelect = styled(PrioritySelect)({
    width: 150,
    border: 'none',
    backgroundColor: '#f0f0f0',
    "& fieldset": {
        border: 'none',
    },
    '&:hover fieldset': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },
})

CustomPrioritySelect.defaultProps = {
    size: 'small'
}


export const NegociacaoViewModal = ({ open, handleModal, data, handleUpdate }) => {

    const onUpdate = (key, data) => {
        handleUpdate(key, data)
    }
    return (
        <Dialog
            open={open}
            onClose={handleModal}
            fullWidth={true}
            maxWidth='lg'
        >
            <DialogContent sx={{ display: 'flex', flexDirection: 'row', padding: '40px 5px 20px 30px' }}>
                <Box sx={{ display: 'flex', width: '70%', padding: '5px 15px 10px 15px' }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TitleBox>
                                <Typography fontWeight='bolder' variant="h5">
                                    {data?.name}
                                </Typography>
                            </TitleBox>
                        </Grid>
                        <Grid item xs={12} >
                            <CustomLabel fontWeight='bolder' variant="subtitle2">Descrição</CustomLabel>
                            <DescriptionBox
                                sx={{
                                    padding: '0px !important',
                                }}
                                dangerouslySetInnerHTML={{ __html: data?.description }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <CustomLabel variant="subtitle1" fontWeight='bolder'>Comentarios</CustomLabel>
                            <Box display='flex' gap={2} maxHeight='80px'>
                                <Avatar sx={{ width: 25, height: 25 }} />
                                <CommentTextField
                                    type="text"
                                    placeholder="Adicionar comentário..."
                                    size="small"
                                    multiline={true}
                                    rows={2}
                                >
                                </CommentTextField>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box display='flex' flexDirection='row' gap={1} alignItems='center' >
                                <Avatar sx={{ width: 25, height: 25 }} />
                                <CustomLabel>Usuario1</CustomLabel>
                            </Box>
                            <Box display='flex' paddingLeft='30px'>
                                <Typography>Comentario teste</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box display='flex' flexDirection='column' sx={{ width: '30%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomLabel variant="subtitle2" fontWeight='bolder'>Etapa</CustomLabel>
                            <Box width={150} >
                                <AutoCompleteGroups
                                    textFieldStyle={textFieldStyles}
                                    initialValue={data?.Group}
                                    name='Group'
                                    onChange={(e) => onUpdate('Group', e.target)}
                                    renderInput={(params) => (
                                        <CustomGroupTextField
                                            name="Group"
                                            {...params}
                                        >
                                        </CustomGroupTextField>
                                    )}
                                >
                                </AutoCompleteGroups>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomLabel variant="subtitle2" >Vendedor</CustomLabel>
                            <Box display='flex' alignItems='center' gap={1} bgcolor='primary.main' color='white' width={120} borderRadius={2} padding='5px 5px 5px 5px'>
                                <Avatar sx={{ width: 16, height: 16 }}></Avatar>
                                <Typography>{data?.Vendedor.name}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box width={120}>
                                <CustomLabel variant="subtitle2" >Prioridade</CustomLabel>
                                <CustomPrioritySelect
                                    name='prioridade'
                                    value={data?.prioridade}
                                    onChange={(e) => onUpdate(e.target.name, e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} display='flex' direction='column'>
                            <CustomLabel variant="subtitle2" >Previsão</CustomLabel>
                            <CustomInputDate
                                name='closeExpect'
                                value={data?.closeExpect}
                                onChange={(e) => onUpdate(e.target.name, e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} display='flex' direction='column'>
                            <CustomLabel variant="subtitle2" >Abertura</CustomLabel>
                            <CustomInputDate
                                name='createdAt'
                                value={data?.createdAt}
                                onChange={(e) => onUpdate(e.target.name, e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog >
    )
}