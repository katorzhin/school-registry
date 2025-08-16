import { Box, Typography } from '@mui/material';
import LanguageToggle from '../languageToggle/LanguageToggle.jsx';
import {styles} from './styles.js';
import {useTranslation} from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

    return (
        <Box sx={styles.container}>
            <Typography variant="h4" component="h1" fontWeight="bold">
                {t('title')}
            </Typography>
            <LanguageToggle />
        </Box>
    );
};

export default Header;