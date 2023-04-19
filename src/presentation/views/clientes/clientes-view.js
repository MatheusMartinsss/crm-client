import { useState } from "react"
import { Box, ButtonGroup, Button } from "@mui/material"
import { ClientesList } from "../../components/clientes-list/clientes-list"
import { ClienteModal } from "../../components/cliente-form/cliente-modal"
import Layout from "../../components/layout/layout"
export const ClientesView = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen((state) => !state)

    return (
        <Layout>
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
                <ClienteModal open={open} handleModal={handleOpen} />
            </Box>
        </Layout>
    )
}