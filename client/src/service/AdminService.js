import * as Response from '~/util/httpsRequest';

export const getAllUsers = async ({ sort = 'asc' }) => {
    try {
        const res = await Response.get('admin/users', {
            params: { sort },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
