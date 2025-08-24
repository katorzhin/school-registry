import {Box, Button, TextField, Typography, Alert} from '@mui/material';
import {styles} from './styles.js';
import {useTranslation} from "react-i18next";
import {useLoginForm} from "@/components/forms/loginForm/useLoginForm.js";
import ControlTextInput from "@/inputs/ControlTextInput/ControlTextInput.jsx";

const LoginForm = ({onOpenRegister}) => {
    const {t} = useTranslation();
    const {form, errors,generalError, handleChange, handleSubmit} = useLoginForm();

    return (
        <Box sx={styles.outerBoxStyle}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={styles.formBoxStyle}
            >
                <Typography
                    variant="h5"
                    sx={styles.titleStyle}>
                    {t('auth.form.title')}
                </Typography>

                <ControlTextInput
                    name="username"
                    label={t('auth.form.username')}
                    fullWidth
                    margin="normal"
                    value={form.username}
                    onChange={handleChange}
                    size="small"
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <ControlTextInput
                    name="password"
                    label={t('auth.form.password')}
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password}
                />

                {generalError && (
                    <Alert severity="error" sx={styles.errorStyle}>
                        {generalError}
                    </Alert>
                )}

                <Box sx={styles.buttonBoxStyle}>
                    <Button
                        variant="outlined"
                        onClick={onOpenRegister}>{t('auth.buttons.register')}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit">{t('auth.buttons.login')}
                    </Button>

                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;
