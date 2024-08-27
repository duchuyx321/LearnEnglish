import * as Request from '~/util/httpsRequest';

// [GET] /progress/combined?type=course
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

// [POST] /progress/create?type= & courseID
export const createProgress = async (type = 'course', courseID) => {
    try {
        const res = await Request.post('progress/create', {
            params: {
                type,
                courseID,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
