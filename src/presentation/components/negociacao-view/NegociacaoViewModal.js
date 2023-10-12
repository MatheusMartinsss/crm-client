import { Dialog, DialogContent, DialogTitle, Typography, styled, TextField, Grid, Paper } from "@mui/material"
import { useState } from "react"

const TitleModal = styled(TextField)(({ theme }) => ({

    cursor: 'text',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}))

TitleModal.defaultProps = {
    inputProps: {
        style: {
            fontFamily: 'Rubik',
            fontWeight: 700,
            fontSize: 30,
        }
    }
}



export const NegociacaoViewModal = ({ open, handleModal, data }) => {
    return (
        <Dialog
            open={open}
            onClose={handleModal}
            fullWidth={true}
            maxWidth='md'
        >
            <Grid container padding='20px 10px 20px 10px' spacing={2}>
                <Grid item xs={12}>
                    <TitleModal
                        fullWidth
                        value={data?.name}
                        variant='outlined'

                    />
                </Grid>
                <Grid item xs={12}>
                    <TitleModal fullWidth value={data?.description}></TitleModal>
                </Grid>
            </Grid>

        </Dialog>
    )
}