import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { remoteListGroupsUseCase } from '../../domain/useCases/remote-groups-useCase';

export default function AutoCompleteGroups({ handleGroup, error, helperText, initialValue, ...props }) {
    const { onChange } = props
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
            {...props}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            defaultValue={initialValue || null}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            onChange={(e, value) => onChange(value)}
        />
    );
}
