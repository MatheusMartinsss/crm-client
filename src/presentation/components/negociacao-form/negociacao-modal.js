import React, { useState } from 'react'
import { Dialog, Fab, DialogContent } from '@mui/material'
import { NegociacaoForm } from './negociacao-form'


export const NegociacaoModal = () => {

    const [open, setOpen] = useState(false)

    const handleModal = () => setOpen((state) => !state)

    return (
        <React.Fragment>
            <Fab onClick={handleModal} variant="extended" size="small" sx={{ width: 300 }} color="primary" aria-label="add">
                Nova negociação
            </Fab>
            <Dialog
                open={open}
                onClose={handleModal}
            >
                <DialogContent>
                    <NegociacaoForm />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}