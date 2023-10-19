import { Box, styled, Button } from "@mui/material"
import { CustomLabel } from "./styles"
import React, { useState } from "react"
import { TextEditor } from "../../TextEditor/TextEditor"
const CustomBox = styled(Box)(({ theme }) => ({
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },
    minHeight: 250,
}))

const CustomButton = styled(Button)({
    '&.MuiButton-root': {
        fontSize: '0.7rem',
        padding: '4px 12px',
        transition: 'background 0.3s, border 0.3s',
    }
})


export const DescriptionBox = ({ description, onUpdate }) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(description)

    const handleEdit = () => setEditMode((state) => !state)

    const handleUpdate = () => {
        onUpdate('description', value)
        handleEdit()
    }
    const handleCancel = () => {
        setValue(description)
        handleEdit()
    }
    return (
        <React.Fragment>
            <CustomLabel fontWeight='bolder' variant="subtitle2">Descrição</CustomLabel>
            {editMode ? (
                <TextEditor
                    value={value}
                    style={{
                        minHeight: 200
                    }}
                    onChange={(text) => setValue(text)}

                >
                </TextEditor>
            ) : (
                <CustomBox onClick={handleEdit}>
                    <Box
                        sx={{ padding: '0px !important', }}
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </CustomBox>
            )}
            {editMode && (
                <Box display='flex' flexDirection='row' justifyContent='flex-end' mt={5} gap={1} >
                    <CustomButton variant='contained' color="inherit" onClick={handleCancel}>Cancelar</CustomButton>
                    <CustomButton variant='contained' color="primary" onClick={handleUpdate}>Salvar</CustomButton>
                </Box>
            )}
        </React.Fragment>
    )
}