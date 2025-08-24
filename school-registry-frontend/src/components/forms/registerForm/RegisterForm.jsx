import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Alert
} from '@mui/material';
import {useRegisterForm} from "@/components/forms/registerForm/useRegisterForm.js";
import {useTranslation} from "react-i18next";

const RegisterForm = ({ open, onClose }) => {
    const { t } = useTranslation();
    const {
        form, error, errors,
        handleChange, handleSubmit, handleClose
    } = useRegisterForm({ onClose });

    return (
        <Dialog open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth>
            <DialogTitle> {t('auth.dialog.title')}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label={t('auth.form.username')}
                        name="username"
                        fullWidth
                        margin="dense"
                        value={form.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        size="small"
                    />
                    <TextField
                        label={t('auth.form.email')}
                        name="email"
                        fullWidth
                        margin="dense"
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        size="small"
                    />
                    <TextField
                        label={t('auth.form.password')}
                        name="password"
                        type="password"
                        fullWidth
                        margin="dense"
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        size="small"
                    />
                    <TextField
                        label={t('auth.form.repeatPassword')}
                        name="confirm"
                        type="password"
                        fullWidth
                        margin="dense"
                        value={form.confirm}
                        onChange={handleChange}
                        error={!!errors.confirm}
                        helperText={errors.confirm}
                        size="small"
                    />
                    {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('auth.buttons.cancel')}</Button>
                    <Button type="submit" variant="contained">{t('auth.buttons.createAccount')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default RegisterForm;
