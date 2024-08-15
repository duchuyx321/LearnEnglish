import * as Request from '~/util/httpsRequest';

// search course
export const search = async (q) => {
    try {
        const res = await Request.get('course/search', {
            params: {
                q,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
