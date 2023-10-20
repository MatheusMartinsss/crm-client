import { Chip, Box } from "@mui/material"
import { prioritys } from "../../../helpers/consts/prioridades";


export const PriorityChip = ({ ...props }) => {
    const priority = Object.values(prioritys).find(
        (p) => p.name === props.label
    );
    return (
        <Chip
            {...props}
            variant="outlined"
            icon={<Box color={priority.color} sx={{ display: 'flex', alignItems: 'center' }}>{priority.icon}</Box>}
            sx={{
                color: priority.color
            }}
        />

    )
}