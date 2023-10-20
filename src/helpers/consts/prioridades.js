import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export const prioritys = {
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
