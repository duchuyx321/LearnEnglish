import * as Request from '~/util/httpsRequest';

// search course
export const user = async () => {
    try {
        const res = await Request.get('users/me');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
