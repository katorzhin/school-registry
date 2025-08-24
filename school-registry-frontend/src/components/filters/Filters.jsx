import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
} from '@mui/material';

import {schoolTypes} from '@/constants/schoolTypes.js';
import {styles} from './styles.js';
import ControlTextInput from "../../inputs/ControlTextInput/ControlTextInput.jsx";
import ControlSelectInput from "../../inputs/ControlSelectInput/ControlSelectInput.jsx";
import {useTranslation} from "react-i18next";

const Filters = ({filters, onChange}) => {
    const {t} = useTranslation();

    return (
        <Box sx={styles.container}>
            <ControlTextInput
                label={t('filters.region')}
                name="region"
                value={filters.region}
                onChange={onChange}
                size="small"
            />

            <FormControl sx={{...styles.select, ...styles.formControlWithClear}}>
                <InputLabel sx={styles.label}>{t('filters.type')}</InputLabel>
                <ControlSelectInput
                    name="type"
                    value={filters.type}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">{t('filters.allTypes')}</MenuItem>
                    {schoolTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                            {t(type.labelKey)}
                        </MenuItem>
                    ))}
                </ControlSelectInput>
            </FormControl>

            <FormControl sx={{...styles.select, ...styles.formControlWithClear}}>

                <InputLabel sx={styles.label}>{t('filters.status')}</InputLabel>
                <ControlSelectInput
                    name="active"
                    value={filters.active}
                    onChange={onChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">{t('filters.allStatuses')}</MenuItem>
                    <MenuItem value="true">{t('filters.activeOnly')}</MenuItem>
                    <MenuItem value="false">{t('filters.inactiveOnly')}</MenuItem>
                </ControlSelectInput>
            </FormControl>
        </Box>
    );
};

export default Filters;
