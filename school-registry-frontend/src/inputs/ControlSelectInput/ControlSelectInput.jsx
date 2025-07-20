import {
    Select,
    IconButton,
    InputAdornment,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {styles} from './styles.js';

const ControlSelectInput = ({
                                name,
                                label,
                                value,
                                onChange,
                                onClear,
                                setForm,
                                children,
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

        <Select
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            endAdornment={
                value && (
                    <InputAdornment
                        position="end"
                        sx={styles.inputAdornment}
                    >
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
                )
            }
            sx={styles.select}
            {...rest}
        >
            {children}
        </Select>
    );
};

export default ControlSelectInput;
