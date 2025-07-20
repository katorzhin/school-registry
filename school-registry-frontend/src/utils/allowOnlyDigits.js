export const allowOnlyDigits = (e) => {
    const input = e.nativeEvent.data;
    const value = e.target.value;

    if (!/^\d$/.test(input) || value.length >= 8) {
        e.preventDefault();
    }
};