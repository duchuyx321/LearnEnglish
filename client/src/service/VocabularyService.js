import * as Response from '~/util/httpsRequest.js';

export const getVocabulary = async (lessonID) => {
    try {
        const res = await Response.get('/vocabulary/combined', {
            params: {
                lessonID,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
