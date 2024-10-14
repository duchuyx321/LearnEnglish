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
export const updateProfile = async ({
    first_name,
    last_name,
    avatar,
    bio,
    facebook_url,
    instagram_url,
    tiktok_url,
}) => {
    try {
        let data;
        if (avatar) {
            const fromData = new FormData();
            fromData.append('avatar', avatar);
            // add to fromData
            if (first_name) fromData.append('first_name', first_name);
            if (last_name) fromData.append('last_name', last_name);
            if (bio) fromData.append('bio', bio);
            if (facebook_url) fromData.append('facebook_url', facebook_url);
            if (instagram_url) fromData.append('instagram_url', instagram_url);
            if (tiktok_url) fromData.append('tiktok_url', tiktok_url);

            data = fromData;
        } else {
            // cú pháp spread operator
            data = {
                ...(first_name && { first_name }),
                ...(last_name && { last_name }),
                ...(bio && { bio }),
                ...(facebook_url && { facebook_url }),
                ...(instagram_url && { instagram_url }),
                ...(tiktok_url && { tiktok_url }),
            };
        }

        const res = Response.patch('/profile/edit', data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
