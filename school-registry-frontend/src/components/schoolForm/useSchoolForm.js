import {validateSchoolForm} from '../../validators/schoolValidator';
import {createSchool} from '../../api';
import {useEffect, useState} from 'react';
import {initialSchoolForm} from '../../constants/initialForm.js';

export const useSchoolForm = (open, onSuccess, onClose) => {

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState(initialSchoolForm);


    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = {...prev};
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateSchoolForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await createSchool(form);
        setForm(initialSchoolForm);
        setErrors({});
        onSuccess?.();
        onClose?.();
    };

    useEffect(() => {
        if (!open) {
            setForm(initialSchoolForm);
            setErrors({});
        }
    }, [open]);

    return {
        form,
        setForm,
        errors,
        handleChange,
        handleSubmit,
    };
};

