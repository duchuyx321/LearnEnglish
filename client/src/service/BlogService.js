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
export const createBlog = async ({
    content = undefined,
    image = null,
    is_public = true,
    is_approved = true,
}) => {
    try {
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image); // Nếu có file, thêm vào FormData
        }
        formData.append('is_public', is_public);
        formData.append('is_approved', is_approved);
        const res = await Response.post('blog/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Cần thiết để gửi FormData
            },
        });
        return res;
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
