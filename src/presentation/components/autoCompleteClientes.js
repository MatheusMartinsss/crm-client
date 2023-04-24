import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { remoteListClientesUseCase } from '../../domain/useCases/remote-clientes-useCase';

export default function AutoCompleteClientes({ handleCliente, error, helperText, initialValue }) {
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false)


    const fetchData = async () => {
        if (options.length) return
        setLoading(true)
        await remoteListClientesUseCase().then((response) => {
            setOptions(response)
        }).finally(() => setLoading(false))
    }

    return (
        <Autocomplete

            fullWidth
            defaultValue={initialValue || null}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            onChange={(value, newValue) => {
                handleCliente(newValue.id)
            }}
            renderInput={(params) => (
                <TextField
                    onClick={fetchData}
                    error={error}
                    helperText={helperText}
                    {...params}
                    label="Clientes"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading && <CircularProgress color="inherit" size={20} />}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}