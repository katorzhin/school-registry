import React from 'react';
import {TableRow, TableCell, Button} from '@mui/material';
import {useTranslation} from "react-i18next";

const SchoolRow = ({school, onDeactivate}) => {

    const {t} = useTranslation();

    return (
        <TableRow>
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.edrpou}</TableCell>
            <TableCell>{school.region}</TableCell>
            <TableCell>{school.type}</TableCell>
            <TableCell>{school.active ? t('status.active') : t('status.inactive')}</TableCell>
            <TableCell>
                {school.active ? (
                    <Button variant="outlined" color="error" size="small"
                            onClick={() => onDeactivate(school.id)}>
                        {t('buttons.deactivate')}
                    </Button>
                ) : (
                    '-'
                )}
            </TableCell>
        </TableRow>
    );
};

export default SchoolRow;
