import { Box, TextField, styled, Avatar } from "@mui/material"
import { CustomLabel } from "./styles"
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

export const CommentBox = () => {
    return (
        <Box>
            <CustomLabel variant="subtitle1" fontWeight='bolder'>Comentarios</CustomLabel>
            <Box display='flex'  maxHeight='80px' gap={2}>
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
        </Box>
    )
}