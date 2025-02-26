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

//  course find
export const course = async (course_slug) => {
    try {
        const res = await Request.get(`course/${course_slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
