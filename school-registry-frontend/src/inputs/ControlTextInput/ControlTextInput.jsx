import {
    TextField,
    IconButton,
    InputAdornment
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {styles} from './styles.js';

const ControlTextInput = ({
                              name,
                              label,
                              value,
                              onChange,
                              onClear,
                              error,
                              helperText,
                              setForm,
                              ...rest
                          }) => {

    const handleClear = () => {
        if (typeof onClear === 'function') return onClear();
        if (typeof setForm === 'function') {
            setForm((prev) => ({...prev, [name]: ''}));
        } else if (typeof onChange === 'function') {
            onChange({target: {name, value: ''}});
        }
    };

    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={helperText}
            size="small"
            InputProps={{
                endAdornment: value && (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={handleClear}
                            edge="end"
                            className="clear-button"
                            sx={styles.clearButton}
                        >
                            <ClearIcon sx={styles.clearIcon}/>
                        </IconButton>
                    </InputAdornment>
                ),
                sx: styles.inputRoot,
            }}
            {...rest}
        />
    );
};

export default ControlTextInput;