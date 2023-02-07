import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { remoteListClientesUseCase } from '../../domain/useCases/remote-clientes-useCase';

export default function AutoCompleteClientes({ handleCliente, error, helperText }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        if (!options.length) {
            const fetchClientes = async () => {
                await remoteListClientesUseCase()
                    .then((response) => {
                        setOptions(response)
                    })
            }
            fetchClientes()
        }
        // eslint-disable-next-line
    }, [open])

    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            fullWidth
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            onChange={(value, newValue) => {
                handleCliente(newValue.id)
            }}
            renderInput={(params) => (
                <TextField
                    error={error}
                    helperText={helperText}
                    {...params}
                    label="Clientes"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}