import { Box, MenuItem, Select } from '@mui/material';
import { prioritys } from '../../helpers/consts/prioridades';


export const PrioritySelect = ({ ...props }) => {
    const { value, onChange } = props
    const selectedPriority = Object.values(prioritys).find(
        (p) => p.name === value
    );
    return (
        <Select
            {...props}
            value={selectedPriority?.name || ''}
            onChange={onChange}
        >
            <MenuItem sx={{ display: 'flex', justifyContent: 'center', height: '25px' }} value=""></MenuItem>
            {Object.values(prioritys).map((item, idx) => (
                <MenuItem value={item?.name} key={idx} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Box
                            display='flex'
                            color={item.color}

                        >
                            {item.icon}
                        </Box>
                        <Box marginLeft="8px">
                            {item.label}
                        </Box>
                    </Box>
                </MenuItem>
            ))}
        </Select>
    );
}

