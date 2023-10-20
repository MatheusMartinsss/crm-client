import * as React from 'react';
import { Button, Paper, Box, CircularProgress, Autocomplete, TextField } from '@mui/material';
import { ClienteModal } from './cliente-form/cliente-modal';
import { useCliente } from '../hooks/useCliente';
export default function SearchClientes({ ...props }) {
    const { value, renderInput, createoption = false, onChange, error, helperText } = props

    const { data, isLoading, fetchData, addCliente } = useCliente()
    const [open, setOpen] = React.useState(false)

    const handleModal = () => setOpen((state) => !state)

    const Menu = ({ children, other }) => (
        <Box component={Paper} padding={1} {...other}>
            {createoption && <Button onMouseDown={handleModal} fullWidth color='primary' variant='contained'>Novo cliente</Button>}
            {children}
        </Box>
    )
    const onCreate = (response) => {
        addCliente(response)
        onChange(response)
    }

    const finalRenderInput = renderInput || ((params) => (
        <TextField
            error={error}
            helperText={helperText}
            {...params}
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {isLoading && <CircularProgress color="inherit" size={20} />}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                ),
            }}
        />
    ));
    return (
        <>
            <Autocomplete
                {...props}
                fullWidth
                value={value || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name + " " + option.lastname}
                options={data}
                onChange={(_, newValue) => onChange(newValue)}
                PaperComponent={Menu}
                onSelect={fetchData}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.name} {option.lastname}
                    </li>
                )}
                renderInput={finalRenderInput}
            />
            <ClienteModal open={open} handleModal={handleModal} onCreate={onCreate} />
        </>
    );
}