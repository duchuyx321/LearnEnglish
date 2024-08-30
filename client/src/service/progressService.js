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
    courseID,
    course_slug,
    type = 'course',
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
export const createProgress = async (courseID, type = 'course') => {
    try {
        const res = await Request.post('progress/create', {
            type,
            courseID,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// PUT
export const updateProgress = (lessonID, courseID, type = 'course') => {
    try {
        const res = Request.put('progress/update', {
            params: {
                type,
                courseID,
            },
            lessonID,
        });
        return res.body;
    } catch (error) {
        console.log(error);
    }
};
