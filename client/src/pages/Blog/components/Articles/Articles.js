import classNames from 'classnames/bind';
import { CiBookmark } from 'react-icons/ci';
import { IoBookmark } from 'react-icons/io5';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { LuMessageSquare } from 'react-icons/lu';
import { useState } from 'react';

import styles from './Articles.module.scss';
import Image from '~/components/Image';
import { formatTime } from '~/service/formatTime';

const cx = classNames.bind(styles);

function Articles({ data = [] }) {
    const [isBookmark, setIsBookmark] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isComment, setIsComment] = useState(false);
    // handle function
    const handleOnBookmark = () => {
        setIsBookmark(!isBookmark);
    };
    const handleOnLike = () => {
        setIsLike(!isLike);
    };
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handleComment = () => {
        setIsComment(!isComment);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('author')}>
                    <div className={cx('avatar')}>
                        <Image src={data?.profile?.avatar} alt="avatar" />
                    </div>
                    <div className={cx('profile')}>
                        <h3>{`${data?.profile?.first_name} ${data?.profile?.last_name}`}</h3>
                        <p>{formatTime(data?.createdAt)}</p>
                    </div>
                </div>
                <div className={cx('action')}>
                    <button
                        className={cx('btn-action', { active: isBookmark })}
                        onClick={() => handleOnBookmark()}
                    >
                        {!isBookmark ? <CiBookmark /> : <IoBookmark />}
                    </button>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <p className={cx({ expanded: isExpanded })}>
                        {data?.content}
                    </p>
                    <button
                        className={cx('btn-toggle')}
                        onClick={() => handleToggle()}
                    >
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                </div>
                <Image
                    src={data?.image}
                    alt="ảnh nền"
                    className={cx('image')}
                />
            </div>
            <div className={cx('footer')}>
                <button
                    className={cx('btn-action', { active: isLike })}
                    onClick={() => handleOnLike()}
                >
                    {isLike ? <IoMdHeart /> : <IoIosHeartEmpty />}
                    <p>{data?.like_count}</p>
                </button>
                <button
                    className={cx('btn-action', { active: isComment })}
                    onClick={() => handleComment()}
                >
                    <LuMessageSquare />
                    <p>20</p>
                </button>
            </div>
        </div>
    );
}

export default Articles;
