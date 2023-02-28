import React from 'react'
import { Dialog, DialogContent } from '@mui/material'


export const ModalForm = ({ data, open, handleModal, children }) => {
    return (
        <Dialog open={open} onClose={handleModal}>
            <DialogContent>
                {React.cloneElement(children, { handleModal: handleModal, data: data })}
            </DialogContent>
        </Dialog>
    )
}