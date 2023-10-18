import { Box, Avatar, Typography } from "@mui/material"
import { CustomLabel } from "./styles"
export const CommentList = ({ }) => {
    return (
        <Box display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='row' gap={1} alignItems='center' >
                <Avatar sx={{ width: 25, height: 25 }} />
                <CustomLabel>Usuario1</CustomLabel>
            </Box>
            <Box display='flex' paddingLeft='30px'>
                <Typography>Comentario teste</Typography>
            </Box>
        </Box>
    )
}