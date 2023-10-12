import { useState } from "react"
import { Box, ButtonGroup, Button} from "@mui/material"
import { ClientesList } from "../../components/clientes-list/clientes-list"
import { ClienteModal } from "../../components/cliente-form/cliente-modal"
import Layout from "../../components/layout/layout"
import { FilterBox } from "../../components/custom-styles/custom-styles"
export const ClientesView = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen((state) => !state)

    return (
        <Layout>
            <Box display='flex' flexDirection='column'  >
                <FilterBox>
                    <ButtonGroup size='small' variant="outlined" aria-label="outlined primary button group">
                        <Button onClick={handleOpen} variant="contained">Novo Cliente</Button>
                    </ButtonGroup>
                </FilterBox>
                <Box mt={2}>
                    <ClientesList />
                </Box>
                <ClienteModal open={open} handleModal={handleOpen} />
            </Box>
        </Layout>
    )
}