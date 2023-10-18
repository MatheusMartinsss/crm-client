import { Box } from "@mui/material"
import Layout from "../../components/layout/layout"
import { NegociacaoForm } from "../../components/negociacao-form/negociacao-form"


export const NegociacaoView = () => {
    return (
        <Layout>
            <Box>
                <NegociacaoForm />
            </Box>
        </Layout>
    )
}

