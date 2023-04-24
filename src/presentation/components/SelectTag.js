import * as React from 'react';


import { Box, IconButton, MenuItem, Paper, Select, Typography } from '@mui/material'
import { remoteListTagsUseCase } from '../../domain/useCases/remote-tags-useCase';
import EditIcon from '@mui/icons-material/Edit';

export default function AutoCompleteTagsAdd({ initialValue, handleChange }) {

    const [editMode, setEditMode] = React.useState(!!initialValue)
    const [options, setOptions] = React.useState([])
    const handleSelect = async () => {
        setEditMode((state) => !state)

    }
    const fetchOptions = async () => {
        if (options.length) return
        const response = await remoteListTagsUseCase()
        setOptions(response)
    }
    let selectedOption = options.find((option) => option?.id === initialValue?.id) || ''
    const handle = (e) => {
        handleChange(e.target.value)
        handleSelect()
    }
    return (
        editMode ? (
            <Box component={Paper} p={1} display='flex' justifyContent='space-between' alignItems='center' >
                <Box display='flex' gap={2} alignItems='center'>
                    <Box width={16} height={16} borderRadius={16} bgcolor={initialValue?.color} />
                    <Typography>{initialValue?.name}</Typography>
                </Box>
                <Box>
                    <IconButton onClick={handleSelect}>
                        <EditIcon />
                    </IconButton>
                </Box>
            </Box>
        ) : (
            <React.Fragment>
                <Select
                    fullWidth
                    value={selectedOption}
                    onClick={fetchOptions}
                    onChange={(event) => handle(event)}
                >
                    {options.map((item) => (
                        <MenuItem key={item.id} value={item}>
                            <Box display='flex' gap={2} alignItems='center'>
                                <Box width={16} height={16} borderRadius={16} bgcolor={item?.color} />
                                <Typography>{item?.name}</Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </React.Fragment>
        )
    );
}

