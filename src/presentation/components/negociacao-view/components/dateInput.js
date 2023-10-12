import React from "react"
import { Box, Typography } from "@mui/material"
import format from "date-fns/format"

export const DateInput = ({ date }) => {
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
            width={120}
        >
            {date ?
                <Typography>{format(new Date(date), 'dd/MM/yyyy')}</Typography>
                :
                <Typography>N/A</Typography>
            }
        </Box>
    )
}