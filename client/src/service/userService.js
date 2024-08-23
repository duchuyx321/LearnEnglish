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
