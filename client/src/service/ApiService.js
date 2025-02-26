import * as Response from '~/util/httpsRequest';

export const sendCode = async ({ email = '' }) => {
    try {
        const res = await Response.post('api/code/sendCode', { email });
        return res;
    } catch (error) {
        console.log(error);
        return { error, message: 'Vui Lòng Kiểm Tra lại Email' };
    }
};
export const checkCode = async ({ email = '', token = '' }) => {
    try {
        const res = await Response.post('api/code/checkCode', {
            email,
            token,
        });
        return res;
    } catch (error) {
        console.log(error);
        return { error, message: 'Token Không Tồn Tại' };
    }
};
