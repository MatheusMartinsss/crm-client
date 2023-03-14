import React from 'react'
import { Dialog, DialogContent } from '@mui/material'
import { GroupForm } from './group-form'
export const GroupModal = ({ open, handleModal, data }) => {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleModal}
            >
                <DialogContent>
                    <GroupForm handleModal={handleModal} data = {data} />
                </DialogContent>
            </Dialog>
        </React.Fragment>

    )
}