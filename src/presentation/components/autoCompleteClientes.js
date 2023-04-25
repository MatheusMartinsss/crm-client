import * as React from 'react';
import { Button, Paper, Box, CircularProgress, Autocomplete, TextField } from '@mui/material';
import { ClienteModal } from './cliente-form/cliente-modal';
import { useCliente } from '../hooks/useCliente';
export default function AutoCompleteClientes({ handleCliente, error, helperText, initialValue }) {
    const { data, isLoading, fetchData, addCliente } = useCliente()
    const [open, setOpen] = React.useState(false)

    const handleModal = () => setOpen((state) => !state)

    const Menu = ({ children, other }) => (
        <Box component={Paper} padding={1} {...other}>
            <Button onMouseDown={handleModal} fullWidth color='primary' variant='contained'>+ Novo cliente</Button>
            {children}
        </Box>
    )
    const onCreate = (response) => {
        addCliente(response)
        handleCliente(response)
    }
    return (
        <>
            <Autocomplete
                fullWidth
                value={initialValue || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name + " " + option.lastname}
                options={data}
                onChange={(value, newValue) => handleCliente(newValue)}
                PaperComponent={Menu}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.name} {option.lastname}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        onClick={fetchData}
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
                )}
            />
            <ClienteModal open={open} handleModal={handleModal} onCreate={onCreate} />
        </>
    );
}