import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
} from '@mui/material';

import {schoolTypes} from '../../constants/schoolTypes.js';
import {styles} from './styles.js';
import ControlTextInput from "../../inputs/ControlTextInput/ControlTextInput.jsx";
import ControlSelectInput from "../../inputs/ControlSelectInput/ControlSelectInput.jsx";

const Filters = ({filters, onChange}) => {

    return (
        <Box sx={styles.container}>
            <ControlTextInput
                label="Область"
                name="region"
                value={filters.region}
                onChange={onChange}
                size="small"
            />

            <FormControl sx={{...styles.select, ...styles.formControlWithClear}}>
                <InputLabel sx={styles.label}>Тип</InputLabel>
                <ControlSelectInput
                    label="Тип"
                    name="type"
                    value={filters.type}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">Усі</MenuItem>
                    {schoolTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                            {type.label}
                        </MenuItem>
                    ))}
                </ControlSelectInput>
            </FormControl>

            <FormControl sx={{...styles.select, ...styles.formControlWithClear}}>

                <InputLabel sx={styles.label}>Активність</InputLabel>
                <ControlSelectInput
                    label="Активність"
                    name="active"
                    value={filters.active}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">Усі</MenuItem>
                    <MenuItem value="true">Активні</MenuItem>
                    <MenuItem value="false">Неактивні</MenuItem>
                </ControlSelectInput>
            </FormControl>
        </Box>
    );
};

export default Filters;
