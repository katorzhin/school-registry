import {Box, Typography, IconButton, Menu, MenuItem, Tooltip, Avatar} from '@mui/material';
import LanguageToggle from '../languageToggle/LanguageToggle.jsx';
import {styles} from './styles.js';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {useAuth} from '../../context/AuthContext';

const Header = () => {
    const {t} = useTranslation();
    const {user, logout} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <Box sx={{...styles.container, gap: 1}}>
            <Typography variant="h4" component="h1" fontWeight="bold">
                {t('title')}
            </Typography>

            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, ml: 'auto'}}>
                {user && (
                    <>
                        <Tooltip title={user.username}>
                            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <Avatar sx={{width: 28, height: 28}}>
                                    {user.username?.[0]?.toUpperCase() || 'U'}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        >
                            <MenuItem disabled>{user.username}</MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorEl(null);
                                logout();
                            }}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
                <LanguageToggle/>
            </Box>
        </Box>
    );
};

export default Header;
