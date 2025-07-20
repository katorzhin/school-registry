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
import {useSchoolForm} from "./useSchoolForm.js";
import ControlTextInput from "../../inputs/ControlTextInput/ControlTextInput.jsx";
import ControlSelectInput from "../../inputs/ControlSelectInput/ControlSelectInput.jsx";

const SchoolForm = ({open, onClose, onSuccess}) => {

    const {form, setForm, errors, handleChange, handleSubmit}
        = useSchoolForm(open, onSuccess, onClose);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={styles.dialog}>
            <DialogTitle>Створення школи</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent
                    sx={styles.content}>
                    <ControlTextInput
                        fullWidth
                        name="name"
                        label="Назва"
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
                        label="ЄДРПОУ"
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
                        label="Область"
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
                        <InputLabel>Тип</InputLabel>
                        <ControlSelectInput
                            name="type"
                            label="Тип"
                            value={form.type}
                            onChange={handleChange}
                            setForm={setForm}
                        >
                            {schoolTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </ControlSelectInput>

                        {errors.type && (
                            <FormHelperText>{errors.type}</FormHelperText>
                        )}
                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Скасувати</Button>
                    <Button type="submit" variant="contained">Створити</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default SchoolForm;
