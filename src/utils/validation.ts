import { object, string, number, date, array } from 'yup';
import { IYupValiation } from '../types';

const leadsResponseSchema = object().shape({
    // Axios response containing joined leads
    data: array().of(
        object().shape({
            name: string().required(),
            price: number().required(),
            created_at: date().required(),
            status: object().shape({
                name: string().required(),
                color: string().required(),
            }).required(),
            responsible: object().shape({
                name: string().required(),
            }).required(),
            contacts: array().of(
                object().shape({
                    name: string().optional(),
                    phone: string().optional(),
                    // email: string().email().optional(), // FOR TESTING PURPOSES!
                    email: string().optional(),
                    position: string().optional(),
                })
            ).required(),
        })
    ).required(),
});

export const validateLeadsResponse = async (response: unknown): Promise<IYupValiation> => {
    try {
        await leadsResponseSchema.validate(response, { abortEarly: false });
        return { valid: true, errors: null };
    } catch (errors) {
        return { valid: false, errors };
    }
};