import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    FormControl,
    InputLabel,
    MenuItem, FormHelperText,
} from '@mui/material';

import {styles} from './styles.js';
import {schoolTypes} from '../../constants/schoolTypes';
import {allowOnlyDigits} from "../../utils/allowOnlyDigits.js";
import {useSchoolCreateForm} from "./useSchoolCreateForm.js";
import ControlTextInput from "../../inputs/ControlTextInput/ControlTextInput.jsx";
import ControlSelectInput from "../../inputs/ControlSelectInput/ControlSelectInput.jsx";
import {useTranslation} from "react-i18next";

const SchoolCreateForm = ({open, onClose, onSuccess}) => {
    const { t } = useTranslation();
    const {form, setForm, errors, handleChange, handleSubmit}
        = useSchoolCreateForm(open, onSuccess, onClose);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={styles.dialog}>
            <DialogTitle>{t('schoolCreateForm.title')}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent
                    sx={styles.content}>
                    <ControlTextInput
                        fullWidth
                        name="name"
                        label={t('schoolCreateForm.name')}
                        value={form.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        size="small"
                        setForm={setForm}

                    />
                    <ControlTextInput
                        fullWidth
                        name="edrpou"
                        label={t('schoolCreateForm.edrpou')}
                        value={form.edrpou}
                        onChange={handleChange}
                        onBeforeInput={allowOnlyDigits}
                        error={!!errors.edrpou}
                        helperText={errors.edrpou}
                        size="small"
                        setForm={setForm}
                    />
                    <ControlTextInput
                        fullWidth
                        name="region"
                        label={t('schoolCreateForm.region')}
                        value={form.region}
                        onChange={handleChange}
                        error={!!errors.region}
                        helperText={errors.region}
                        size="small"
                        setForm={setForm}
                    />

                    <FormControl
                        fullWidth
                        size="small"
                        error={!!errors.type}
                        sx={styles.formControlWithClear}
                    >
                        <InputLabel>{t('schoolCreateForm.type')}</InputLabel>
                        <ControlSelectInput
                            name="type"
                            label={t('schoolCreateForm.type')}
                            value={form.type}
                            onChange={handleChange}
                            setForm={setForm}
                        >
                            {schoolTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {t(type.labelKey)}
                                </MenuItem>
                            ))}
                        </ControlSelectInput>

                        {errors.type && (
                            <FormHelperText>{errors.type}</FormHelperText>
                        )}
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>{t('buttons.cancel')}</Button>
                    <Button type="submit" variant="contained">{t('buttons.create')}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default SchoolCreateForm;
