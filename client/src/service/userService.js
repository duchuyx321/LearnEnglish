import * as Request from '~/util/httpsRequest';

// profile-me
export const user = async () => {
    try {
        const res = await Request.get('users/profile-me');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// combined-me?include=course
export const combineMe = async (include = 'course') => {
    try {
        const res = await Request.get('users/combined-me', {
            params: { include },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const checkRegister = async ({
    username = undefined,
    email = undefined,
}) => {
    try {
        const res = await Request.post('users/checkRegister', {
            username,
            email,
        });
        return res;
    } catch (error) {
        if (error?.response?.data?.message === 'User already exists') {
            return { error: username, message: 'Username đã tồn tại' };
        } else if (error?.response?.data?.message === 'Email already exists') {
            return { error: email, message: 'Email đã tồn tại' };
        }
        console.log(error);
    }
};
