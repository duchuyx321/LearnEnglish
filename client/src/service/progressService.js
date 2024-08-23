import * as Request from '~/util/httpsRequest';

// /progress/combined?type=course
export const combined = async (type = 'course') => {
    try {
        const res = await Request.get('/progress/combined', {
            params: { type },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
