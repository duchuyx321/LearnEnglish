import * as Request from '~/util/httpsRequest';

// /progress/combined?type=course
export const combined = async (type = 'course') => {
    try {
        const res = await Request.get('progress/combined', {
            params: { type },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// [GET] /progress/check-course-registration?courseID
export const checkCourseRegistration = async (
    type = 'course',
    courseID,
    course_slug,
) => {
    try {
        const res = await Request.get('progress/check-course-registration', {
            params: {
                type,
                courseID,
                course_slug,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
