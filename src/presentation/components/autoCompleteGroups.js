import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { ListGroups } from '../../domain/useCases/remote-groups-useCase';

export default function AutoCompleteGroups({ handleGroup, error, helperText, initialValue, ...props }) {
    const { onChange } = props
    const [options, setOptions] = React.useState([]);
    const loading = options.length === 0;

    React.useEffect(() => {
        if (!options.length) {
            fetchGroups()
        }
        // eslint-disable-next-line
    }, [])

    const fetchGroups = async () => {
        await ListGroups()
            .then((response) => {
                setOptions(response)
            })
    }
    return (
        <Autocomplete
            {...props}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            onChange={(e, value) => onChange(value)}
        />
    );
}
