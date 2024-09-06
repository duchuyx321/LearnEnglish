import * as Response from '~/util/httpsRequest';

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
