import {validateSchoolForm} from '@/validators/schoolValidator.js';
import {createSchool} from '@/api/schoolApi.js';
import {useEffect, useState} from 'react';
import {initialSchoolForm} from '@/constants/initialForm.js';
import {useTranslation} from "react-i18next";

export const useSchoolCreateForm = (open, onSuccess, onClose) => {
    const {t} = useTranslation();

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
        const validationErrors = validateSchoolForm(form, t);
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

