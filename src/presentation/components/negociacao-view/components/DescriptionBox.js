import { Box, styled } from "@mui/material"
import { CustomLabel } from "./styles"
const CustomBox = styled(Box)(({ theme }) => ({
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },
    minHeight: 250
}))


export const DescriptionBox = ({ description }) => {
    return (
        <CustomBox>
            <CustomLabel fontWeight='bolder' variant="subtitle2">Descrição</CustomLabel>
            <Box
                sx={{ padding: '0px !important', }}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </CustomBox>
    )
}