import * as Response from '~/util/httpsRequest';

// lesson_slug
export const combinedByCourseID = async (course_slug) => {
    try {
        const res = await Response.get('lesson/combined', {
            params: {
                course_slug: course_slug,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
