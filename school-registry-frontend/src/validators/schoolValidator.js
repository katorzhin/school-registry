import {z} from 'zod';

export const schoolSchema = (t) =>
    z.object({
        name: z
            .string()
            .trim()
            .min(1, t('formValidation.requiredName'))
            .min(7, t('formValidation.minName')),

        edrpou: z
            .string()
            .min(1, t('formValidation.requiredEdrpou'))
            .regex(/^\d{8}$/, t('formValidation.invalidEdrpou')),

        region: z
            .string()
            .min(1, t('formValidation.requiredRegion'))
            .min(7, t('formValidation.minRegion')),

        type: z
            .string()
            .min(1, t('formValidation.requiredType')),
    });

export const validateSchoolForm = (form, t) => {
    const result = schoolSchema(t).safeParse(form);

    if (result.success) return {};

    const errors = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0];
        errors[field] = issue.message;
    }

    return errors;
};