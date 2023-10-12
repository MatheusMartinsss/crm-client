import { TableCell } from "@mui/material"
import format from "date-fns/format"
export const TableCellDate = ({ date, align }) => {

    return (
        date ? (
            <TableCell align={align}>
                {format(new Date(date), 'dd/MM/yyyy')}
            </TableCell >
        ) : (
            <TableCell>
                N/A
            </TableCell>
        )
    )
}