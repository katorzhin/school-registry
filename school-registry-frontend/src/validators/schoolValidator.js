import { z } from 'zod';

export const schoolSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Назва обовʼязкова')
        .min(7, 'Мінімум 7 символи'),

    edrpou: z
        .string()
        .min(1, 'ЄДРПОУ обовʼязковий')
        .regex(/^\d{8}$/, 'Має бути 8 цифр'),

    region: z
        .string()
        .min(1, 'Область обовʼязкова')
        .min(7, 'Мінімум 7 символів'),

    type: z
        .string()
        .min(1, 'Оберіть тип'),
});

export const validateSchoolForm = (form) => {
    const result = schoolSchema.safeParse(form);

    if (result.success) return {};

    const errors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0];
        errors[field] = issue.message;
    }

    return errors;
};