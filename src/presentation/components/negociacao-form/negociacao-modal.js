import React from 'react'
import { Dialog, DialogContent } from '@mui/material'
import { NegociacaoForm } from './negociacao-form'


export const NegociacaoModal = ({ data, open, handleModal }) => {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleModal}
            >
                <DialogContent>
                    <NegociacaoForm data = {data} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}