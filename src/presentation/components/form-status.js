import { Alert, CircularProgress, Backdrop } from '@mui/material';
import React, { Fragment } from 'react'

const FormStatus = ({ loading, error }) => {
    return (
        <Fragment>
            {error.name === 'unauthorizedError' && <Alert  variant="filled" severity="error">Acesso negado!</Alert>}
            {error.name === 'serverError' && <Alert variant="filled" severity="error">Erro interno!</Alert>}
            {!error && loading && (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </Fragment>
    )
}
export default FormStatus;