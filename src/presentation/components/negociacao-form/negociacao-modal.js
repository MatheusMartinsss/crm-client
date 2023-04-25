import React from 'react'
import { Dialog, DialogContent } from '@mui/material'
import { NegociacaoForm } from './negociacao-form'


export const NegociacaoModal = ({ data, open, handleModal, onUpdate, onCreate, onClose }) => {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogContent>
                    <NegociacaoForm data={data} handleModal={onClose} onUpdate={onUpdate} onCreate={onCreate} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}