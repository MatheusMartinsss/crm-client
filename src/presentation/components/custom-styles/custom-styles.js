import styled from "@emotion/styled";
import { TableCell, TableHead, Box } from "@mui/material";


export const TableHeader = styled(TableHead)({
    backgroundColor: '#f0f0f0',
    position: 'sticky',
    top: 0
})

export const CTableCellHeader = styled(TableCell)({
    fontWeight: 'bolder'
})

export const FilterBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '16px'
})