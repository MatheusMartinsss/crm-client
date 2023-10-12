import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box } from '@mui/material';
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

export const PrioritySelect = ({ priority }) => {
    const selectedPriority = Object.values(prioritys).find(
        (p) => p.name === priority
    );

    if (selectedPriority) {
        return (
            <Box
                display="flex"
                alignItems="center"
                backgroundColor="#f0f0f0"
                padding="8px"
                borderRadius="4px"
                cursor="pointer"
                transition="background-color 0.3s"
                _hover={{
                    backgroundColor: '#e0e0e0',
                }}
            >
                <Box
                    display='flex'
                    style={{
                        color: selectedPriority.color,

                    }}
                >
                    {selectedPriority.icon}
                </Box>
                <Box marginLeft="8px">{selectedPriority.label}</Box>
            </Box>
        );
    }
    return <Box>n/a</Box>;
}