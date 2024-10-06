import * as Response from '~/util/httpsRequest';

export const successGG = async ({ _id }) => {
    try {
        const res = await Response.post('api/auth/success', { _id });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
