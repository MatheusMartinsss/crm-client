import { Box,  Typography, styled, TextField, Grid, Avatar } from "@mui/material"
import { useState } from "react"
import AutoCompleteGroups from "../autoCompleteGroups"
import { PrioritySelect } from "../prioritySelect"
import { DateInput } from "./components/dateInput"
import { CustomLabel } from "./components/styles"
import 'quill/dist/quill.snow.css';
import { TitleBox } from "./components/TitleBox"
import { DescriptionBox } from "./components/DescriptionBox"
import { CommentBox } from "./components/CommentBox"
import { CommentList } from "./components/CommentList"

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


export const NegociacaoBoard = ({ data, handleUpdate }) => {
    const onUpdate = (key, data) => {
        handleUpdate(key, data)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', padding: '40px 5px 20px 30px', minHeight: '70vh' }}>
            <Box display='flex' flexDirection='column' width='70%' gap={2} >
                <TitleBox title={data.name} />
                <DescriptionBox description={data.description} />
                <CommentBox />
                <CommentList />
            </Box>
            <Box display='flex' flexDirection='column' sx={{ width: '20%' }} paddingLeft={5}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomLabel variant="subtitle2" fontWeight='bolder'>Etapa</CustomLabel>
                        <Box width={150} >
                            <AutoCompleteGroups
                                value={data?.Group || ''}
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
        </Box>
    )
}