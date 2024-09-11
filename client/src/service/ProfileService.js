import * as Response from '~/util/httpsRequest';

// profile-me
export const Profile_ME = async () => {
    try {
        const res = Response.get('profile/me');
        return res;
    } catch (error) {
        console.log(error);
    }
};
