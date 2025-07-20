import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const SchoolRow = ({ school, onDeactivate }) => (
    <TableRow>
        <TableCell>{school.name}</TableCell>
        <TableCell>{school.edrpou}</TableCell>
        <TableCell>{school.region}</TableCell>
        <TableCell>{school.type}</TableCell>
        <TableCell>{school.active ? 'Так' : 'Ні'}</TableCell>
        <TableCell>
            {school.active ? (
                <Button variant="outlined" color="error" size="small" onClick={() => onDeactivate(school.id)}>
                    Деактивувати
                </Button>
            ) : (
                '-'
            )}
        </TableCell>
    </TableRow>
);

export default SchoolRow;
