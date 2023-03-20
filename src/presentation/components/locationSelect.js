import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Api from '../../helpers/api';
import { Grid } from '@mui/material';

export default function LocationSelect({ estado, cidade, setCidade, setEstado }) {
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        if (!options.length) {
            const fetchStates = async () => {
                const response = await Api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                setOptions(response.data)
            }
            fetchStates()
        }
        // eslint-disable-next-line
    }, [open])

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Autocomplete
                    fullWidth
                    defaultValue={initialValue || null}
                    isOptionEqualToValue={(option, value) => option.nome === value.nome || option}
                    getOptionLabel={(option) => option.nome || option}
                    options={options}
                    loading={loading}
                    onChange={(value, newValue) => {
                        setEstado(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField
                            error={error}
                            helperText={helperText}
                            {...params}
                            label="Estados"
                            autoComplete='new-password'
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
            </Grid>
            {estado &&
                <Grid item xs={12}>
                    <Autocomplete
                        fullWidth
                        defaultValue={initialValue || null}
                        isOptionEqualToValue={(option, value) => option.nome === value.nome || option}
                        getOptionLabel={(option) => option.nome || option}
                        options={options}
                        loading={loading}
                        onChange={(value, newValue) => {
                            setCidade(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                error={error}
                                helperText={helperText}
                                {...params}
                                label="Estados"
                                autoComplete='new-password'
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
                </Grid>
            }
        </React.Fragment>
    );
}