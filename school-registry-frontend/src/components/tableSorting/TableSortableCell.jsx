import { TableCell, TableSortLabel } from '@mui/material';

const TableSortableCell = ({ field, label, sortField, sortDirection, onSort }) => (
    <TableCell sortDirection={sortField === field ? sortDirection : false}>
        <TableSortLabel
            active={sortField === field}
            direction={sortField === field ? sortDirection : 'asc'}
            onClick={() => onSort(field)}
        >
            {label}
        </TableSortLabel>
    </TableCell>
);

export default TableSortableCell;