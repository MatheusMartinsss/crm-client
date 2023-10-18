import { Dialog, DialogContent, DialogTitle } from "@mui/material"


export const Modal = ({ children, ...props }) => {
    const { onClose, open } = props
    return (
        <Dialog
            {...props}
            onClose={onClose}
            open={open}
        >
            
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}