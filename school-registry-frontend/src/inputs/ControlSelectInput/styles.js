export const styles = {
    select: {
        '&:hover .clear-button': {
            visibility: 'visible',
        },
        '& .MuiOutlinedInput-root.Mui-focused .clear-button': {
            visibility: 'visible',
        },
        '& .MuiSelect-select[aria-expanded="true"] ~ .clear-button': {
            visibility: 'hidden',
        },
    },
    inputAdornment: {
        position: 'absolute',
        right: 36,
    },
    clearButton: {
        visibility: 'hidden',
        fontSize: 18,
        padding: 0.5,
    },
    clearIcon: {
        fontSize: 18,
    },
};
