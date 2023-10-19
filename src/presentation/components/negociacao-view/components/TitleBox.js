
import { Box, TextField, Typography, styled, Button } from "@mui/material"
import React, { useState } from "react"

const CustomBox = styled(Box)(({ active, theme }) => ({
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none',
        cursor: 'pointer'
    },
    backgroundColor: active ? 'rgba(0, 0, 0, 0.1)' : 'unset',
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
}))

const CustomButton = styled(Button)({
    '&.MuiButton-root': {
        fontSize: '0.7rem',
        padding: '4px 12px',
        transition: 'background 0.3s, border 0.3s',
    }
})

const CustomTextField = styled(TextField)({
    '& fieldset': {
        border: 'none',
        height: 50,
    },
    '& .MuiInputBase-input': {
        fontWeight: 'bolder',
        fontSize: '1.0rem'
    },
    width: '100%'
})

export const TitleBox = ({ title, onUpdate }) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)

    const handleEdit = () => setEditMode((state) => !state)

    const handleUpdate = () => {
        onUpdate('name', value)
        handleEdit()
    }
    const handleCancel = () => {
        setValue(title)
        handleEdit()
    }
    return (
        <React.Fragment>
            <CustomBox onClick={handleEdit} active={editMode}>
                {editMode ? (
                    <CustomTextField
                        value={value}
                        autoFocus
                        onChange={(e) => setValue(e.target.value)}
                    />
                ) : (
                    <Typography fontWeight='bolder' variant="h5">
                        {title}
                    </Typography>
                )}
            </CustomBox >
            {editMode && (
                <Box display='flex' flexDirection='row' justifyContent='flex-end' gap={1} >
                    <CustomButton variant='contained' color="inherit" onClick={handleCancel}>Cancelar</CustomButton>
                    <CustomButton variant='contained' color="primary" onClick={handleUpdate}>Salvar</CustomButton>
                </Box>
            )}
        </React.Fragment>
    )
}