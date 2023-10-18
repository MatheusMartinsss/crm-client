import React from "react"
import { TextField } from "@mui/material"
import format from "date-fns/format"

export const DateInput = ({ ...props }) => {
    const { value, onChange } = props
    const formattedDate = value ? format(new Date(value), "yyyy-MM-dd") : "";
    return (
        <TextField
            {...props}
            value={formattedDate}
            type="date"
            onChange={onChange}
        >

        </TextField>
    )
}