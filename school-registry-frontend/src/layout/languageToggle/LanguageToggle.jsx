import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import {styles} from './styles.js';

const LanguageToggle = () => {
    const { i18n } = useTranslation();

    const handleChange = (_, lang) => {
        if (lang) i18n.changeLanguage(lang);
    };

    return (
        <ToggleButtonGroup
            value={i18n.language}
            exclusive
            onChange={handleChange}
            size="small"
            sx={styles}
        >
            <ToggleButton value="en">EN</ToggleButton>
            <ToggleButton value="ua">UA</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default LanguageToggle;