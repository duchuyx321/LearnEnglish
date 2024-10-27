import * as Response from '~/util/httpsRequest';

export const logout = async () => {
    try {
        const res = Response.post('auth/logout');
        return res;
    } catch (e) {
        console.log(e);
    }
};
export const login = async (loginIdentifier, password) => {
    try {
        const res = await Response.post('auth/login', {
            loginIdentifier,
            password,
        });
        return res;
    } catch (error) {
        if (error?.response?.data?.message === 'Incorrect password') {
            return { error: 'Pass', message: 'Mật Khẩu Không Chính Xác' };
        } else if (error?.response?.data?.message === 'User not found') {
            return {
                error: 'Email',
                message: 'Email hoặc Username không Chính Xác',
            };
        }
        console.log(error);
    }
};
export const register = async (username, email, password) => {
    try {
        const res = await Response.post('auth/register', {
            username,
            email,
            password,
        });
        return res;
    } catch (error) {
        console.log(error);
        return { error, message: 'Could not register' };
    }
};
export const refresh = async () => {
    try {
        const res = await Response.post('auth/refresh');
        return res.data;
    } catch (error) {
        if (error.response.data.message === 'jwt expired') {
            return { error: 'jwtExpired' };
        }
        console.log(error);
    }
};

export const editPass = async ({ password = '', newPassword = '' }) => {
    try {
        const res = await Response.patch('auth/update-password', {
            password,
            newPassword,
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
