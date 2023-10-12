import { Box, FormControl, FormControlLabel, FormLabel, Grid, IconButton, MenuItem, Paper, Select } from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

export const FiltersButton = ({ toggle, open }) => {
    return (
        <IconButton onClick={toggle}>
            {open ? <FilterListOffIcon color="primary" /> : <FilterListIcon color="primary" />}
        </IconButton>
    )
}
export const FiltersBar = ({ open, query, addQuery }) => {
    return (
        <Box display='flex' component={Paper}>
            <Grid container padding={4}>
                <Grid item md={3}>
                    <FormControl fullWidth>
                        <FormLabel>Status</FormLabel>
                        <Select
                            onChange={addQuery}
                            name='status'
                            value={query?.status}
                        >
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='critica'>Critica</MenuItem>
                            <MenuItem value='alta'>Alta</MenuItem>
                            <MenuItem value='media'>Media</MenuItem>
                            <MenuItem value='baixa'>Baixa</MenuItem>
                            <MenuItem value='baixa'>Minima </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}