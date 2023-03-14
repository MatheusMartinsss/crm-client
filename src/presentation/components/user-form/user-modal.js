import React from 'react'
import { Dialog, DialogContent } from '@mui/material'
import { UserForm } from './user-form'
export const UserModal = ({ open, handleModal, data }) => {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleModal}
            >
                <DialogContent>
                    <UserForm handleModal={handleModal} data={data} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}