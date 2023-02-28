import { Box, ButtonGroup, Button } from "@mui/material"
import { ClientesList } from "../../components/clientes-list/clientes-list"
import { useState } from "react"
import { ClienteForm } from "../../components/cliente-form/cliente-form"
import { ModalForm } from "../../components/modal"
export const ClientesView = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen((state) => !state)

    return (
        <Box display='flex' justifyContent='space-between' flexDirection='column' gap={1}>
            <Box
                display='flex'
                flexDirection='row'
                gap={1}
            >
                <ButtonGroup size='small' variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={handleOpen} variant="contained">Novo Cliente</Button>
                </ButtonGroup>
            </Box>
            <ClientesList />
            <ModalForm open={open} handleModal={handleOpen}>
                <ClienteForm />
            </ModalForm>
        </Box>
    )
}