
import { Box, Typography, styled } from "@mui/material"

const CustomBox = styled(Box)(({ theme }) => ({
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: 'none'
    },
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',


}))

export const TitleBox = ({ title }) => {
    return (
        <CustomBox>
            <Typography fontWeight='bolder' variant="h5">
                {title}
            </Typography>
        </CustomBox >
    )
}