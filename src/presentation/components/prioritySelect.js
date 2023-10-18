import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, MenuItem, Select } from '@mui/material';
const prioritys = {
    minima: {
        icon: <KeyboardDoubleArrowDownIcon />,
        name: 'minima',
        label: 'Minima',
        color: '#8bc34a', // Verde claro
    },
    baixa: {
        icon: <KeyboardArrowDownIcon />,
        name: 'baixa',
        label: 'Baixa',
        color: '#2196f3', // Azul
    },
    media: {
        icon: <KeyboardArrowUpIcon />,
        name: 'media',
        label: 'Media',
        color: '#ffc107', // Amarelo
    },
    alta: {
        icon: <KeyboardDoubleArrowUpIcon />,
        name: 'alta',
        label: 'Alta',
        color: '#ff5722', // Laranja
    },
    critica: {
        icon: <PriorityHighIcon />,
        name: 'critica',
        label: 'Critica',
        color: '#f44336', // Vermelho
    },
};

export const PrioritySelect = ({ ...props }) => {
    const { value, onChange } = props
    const selectedPriority = Object.values(prioritys).find(
        (p) => p.name === value
    );
    return (
        <Select
            {...props}
            value={selectedPriority?.name}
            onChange={onChange}
        >
            {Object.values(prioritys).map((item) => (
                <MenuItem value={item?.name} >
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

