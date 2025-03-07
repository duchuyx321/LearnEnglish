import * as Request from '~/util/httpsRequest';

// [GET] /progress/combined?type=course&limit = 1 & page = 1
export const combined = async (type = 'course', limit = 3, page = 1) => {
    try {
        const res = await Request.get('progress/combined', {
            params: { type, page, limit },
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

// [POST] -/progress/findOne?progressable_id=&type
export const findOneProgress = (progressable_id, type = 'course') => {
    try {
        const res = Request.get('/progress/findOne', {
            params: {
                type,
                progressable_id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
// [POST] /progress/create?type= & courseID
export const createProgress = async (progressable_id, type = 'course') => {
    try {
        const res = await Request.post('progress/create', {
            type,
            progressable_id,
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
            type,
            courseID,
            lessonID,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
