import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Profile.module.scss';
import images from '~/assets';
import { user } from '~/service/userService';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Profile() {
    const [userResult, setUserResult] = useState({});
    // authentication token
    useEffect(() => {
        const Token = localStorage.getItem('token');
        if (Token) {
            const fetchAPI = async () => {
                const result = await user();
                if (result) {
                    setUserResult(result);
                }
            };
            fetchAPI();
        }
    }, []);
    console.log(userResult);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('wrapper-img')}>
                    <img
                        src={images.backgroundImage}
                        alt="backgroundImage"
                        className={cx('backgroundImage')}
                    />
                </div>
                <div className={cx('profile')}>
                    <span className={cx('profile-circle')}>
                        <span className={cx('wrapper-avatar')}>
                            <Image
                                src={
                                    userResult?.profile?.avatar ||
                                    images.noImage
                                }
                                alt="avatar"
                                className={cx('avatar')}
                            />
                        </span>
                    </span>
                    <div className={cx('name')}>
                        <h3>
                            {userResult?.profile?.first_name &&
                            userResult?.profile?.last_name
                                ? `${userResult.profile.first_name} ${userResult.profile.last_name}`
                                : `@${userResult?.user?.username}`}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
