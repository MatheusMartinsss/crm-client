import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { remoteListGroupsUseCase } from '../../domain/useCases/remote-groups-useCase';

export default function AutoCompleteGroups({ handleGroup, error, helperText, initialValue }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        if (!options.length) {
            const fetchGroups = async () => {
                await remoteListGroupsUseCase()
                    .then((response) => {
                        setOptions(response)
                    })
            }
            fetchGroups()
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
            defaultValue={initialValue || null}
            fullWidth
            size='small'
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            onChange={(value, newValue) => {
                handleGroup(newValue.id)
            }}
            renderInput={(params) => (
                <TextField
                    error={error}
                    helperText={helperText}
                    size='small'
                    {...params}
                    sx={{
                        border: 'none',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}
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