import React from 'react'
import { Dialog, DialogContent } from '@mui/material'
import { ClienteForm } from './cliente-form'

export const ClienteModal = ({ data, open, handleModal }) => {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleModal}
            >
                <DialogContent>
                    <ClienteForm data={data} handleModal={handleModal} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}