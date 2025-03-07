import * as Response from '~/util/httpsRequest';

export const getComments = async ({
    //page=1&limit=5&commentable_type=blog&commentable_id=66db005490bc4bafeb0ed66f
    commentable_type = '',
    commentable_id = '',
    page = 1,
    limit = 5,
}) => {
    try {
        const res = await Response.get('comments/combined', {
            params: {
                page,
                limit,
                commentable_id,
                commentable_type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const reactions = async ({ _id, type = 'none' }) => {
    try {
        const res = Response.patch(`comments/reaction/${_id}`, { type });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const createComment = async ({
    commentContent = '',
    commentable_type = 'blog',
    commentable_id = '',
}) => {
    try {
        const res = await Response.post('comments/create', {
            commentable_id,
            commentable_type,
            commentContent,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
