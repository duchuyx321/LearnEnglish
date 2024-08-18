import * as Request from '~/util/httpsRequest';

//  course combined
export const combined = async () => {
    try {
        const res = await Request.get('course/combined');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
