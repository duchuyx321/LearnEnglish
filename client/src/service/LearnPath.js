import * as Response from '~/util/httpsRequest';

export const combinedPath = async () => {
    try {
        const res = await Response.get('learn-path/combined');
        return res.data;
    } catch (error) {
        console.log({ message: error.message });
    }
};
