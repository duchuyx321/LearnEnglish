import * as Response from '~/util/httpsRequest';

// [GET]
export const getBlogs = async (page = 1, limit = 10) => {
    try {
        const res = await Response.get('blog/combined', {
            params: {
                page,
                limit,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

// [POST]
export const createBlog = async (content, image) => {
    try {
        const res = await Response.post('blog/create', { content, image });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// [PUT]
export const updateBlog = async ({
    _id,
    is_like = undefined,
    is_bookmark = undefined,
    ...other
}) => {
    try {
        const res = await Response.put(`blog/update/${_id}`, {
            is_like,
            is_bookmark,
            ...other,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
