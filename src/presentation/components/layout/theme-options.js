import { createTheme } from '@mui/material/styles';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4b58bf',
        },
        secondary: {
            main: '#180018',
        },
        background: {
            default: '#272727',
            paper: '#0e0d0d',
        },
    },
});

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            default: '#f5f5f5',
            paper: '#FFFFF',
        },
    },
})