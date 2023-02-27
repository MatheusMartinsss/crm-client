import { Chip } from "@mui/material";


export const Tag = ({ label, color, handleRemove }) => {
    return (
        <Chip
            label={label}
            color='primary'
            sx={{ backgroundColor: color }}
            onDelete={handleRemove}
        />
    )
}