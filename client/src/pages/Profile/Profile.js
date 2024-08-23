import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaUserFriends, FaBirthdayCake } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { CgMail } from 'react-icons/cg';
import { ImProfile } from 'react-icons/im';
import { Link } from 'react-router-dom';

import styles from './Profile.module.scss';
import images from '~/assets';
import { combineMe } from '~/service/userService';
import Image from '~/components/Image';
import { formatTime, formatDay } from '~/service/formatTime';
import Popper from '~/pages/Profile/components/Popper';

const cx = classNames.bind(styles);

function Profile() {
    const [userResult, setUserResult] = useState({});
    // authentication token
    useEffect(() => {
        const Token = localStorage.getItem('token');
        if (Token) {
            const fetchAPI = async () => {
                const result = await combineMe();
                if (result) {
                    setUserResult(result);
                }
            };
            fetchAPI();
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('wrapper-img')}>
                        <div className={cx('border-img')}>
                            <img
                                src={images.backgroundImage}
                                alt="backgroundImage"
                                className={cx('backgroundImage')}
                            />
                        </div>
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
                <div className={cx('body')}>
                    <div className={cx('module')}>
                        <Popper title="Giới Thiệu">
                            <span>
                                <FaUserFriends />
                            </span>
                            Gia Nhập vào <strong>LearnEnglish</strong>
                            {formatTime(userResult?.user?.createdAt)}
                        </Popper>
                        <Popper title="Profile" className={cx('bio')}>
                            <div className={cx('detail')}>
                                <span>
                                    <RxAvatar /> Tên :
                                </span>
                                {userResult?.profile?.first_name &&
                                userResult?.profile?.last_name
                                    ? `${userResult.profile.first_name} ${userResult.profile.last_name}`
                                    : `@${userResult?.user?.username}`}
                            </div>
                            <div className={cx('detail')}>
                                <span>
                                    <CgMail /> Email:
                                </span>
                                {userResult?.user?.email}
                            </div>
                            <div className={cx('detail')}>
                                <span>
                                    <FaBirthdayCake /> Ngày Sinh :
                                </span>
                                {userResult?.profile?.date_of_birth
                                    ? formatDay(
                                          userResult.profile.date_of_birth,
                                      )
                                    : 'No Date Provided'}
                            </div>
                            <div className={cx('detail')}>
                                <span>
                                    <ImProfile /> Bio :
                                </span>
                                {userResult?.profile?.bio}
                            </div>
                        </Popper>
                    </div>
                    <Popper
                        className={'details'}
                        title="Các Khóa Học Đã Tham Gia"
                    >
                        {userResult?.courses ? (
                            userResult.courses.map((item) => (
                                <div key={item._id} className={cx('inner')}>
                                    <Link className={cx('thumb')}>
                                        <img
                                            src={item.image}
                                            alt="img course"
                                        />
                                    </Link>
                                    <div className={cx('info')}>
                                        <Link className={cx('title-course')}>
                                            {item.courseName}
                                        </Link>
                                        <div
                                            className={cx('description-course')}
                                        >
                                            {item.courseDescription}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1> Chưa theo giỏi khóa học nào </h1>
                        )}
                    </Popper>
                </div>
            </div>
        </div>
    );
}

export default Profile;
