import { useState } from 'react';
import { register as registerApi } from '@/api/authApi.js';
import {ErrorCodes} from "@/constants/error-codes.js";
import {useTranslation} from "react-i18next";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useRegisterForm = ({ onClose }) => {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');

    const validate = () => {
        const e = {};
        if (!form.username.trim()) e.username = 'Username is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!emailRegex.test(form.email)) e.email = 'Invalid email';
        if (!form.password) e.password = 'Password is required';
        if (!form.confirm) e.confirm = 'Confirm your password';
        if (form.password && form.confirm && form.password !== form.confirm)
            e.confirm = 'Passwords do not match';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await registerApi({
                username: form.username.trim(),
                password: form.password,
                email: form.email.trim(),
            });

            handleClose();
        } catch (err) {
            if (err.code === ErrorCodes.USERNAME_ALREADY_EXISTS) {
                setError(t('auth.error.usernameAlreadyExists'));
            } else {
                setError(err.message || t('auth.error.registrationFailed'));
            }
        }
    };

    const handleClose = () => {
        onClose?.();
        setForm({ username: '', email: '', password: '', confirm: '' });
        setErrors({});
        setError('');
    };

    return {
        form,
        error,
        errors,
        handleChange,
        handleSubmit,
        handleClose,
    };
};