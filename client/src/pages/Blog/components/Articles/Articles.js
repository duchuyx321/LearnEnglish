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
import { updateBlog } from '~/service/BlogService';
import Comment from '~/components/Comment';

const cx = classNames.bind(styles);

function Articles({ data = [] }) {
    const [isBookmark, setIsBookmark] = useState(data?.is_bookmark || false);
    const [isLike, setIsLike] = useState(data?.is_like || false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [totalLike, setTotalLike] = useState(data?.like_count || 0);
    const token = localStorage.getItem('token');

    // handle function
    const handleOnBookmark = async (_id) => {
        if (token) {
            const is_bookmark = !isBookmark;
            setIsBookmark(is_bookmark);
            await updateBlog({ _id, is_bookmark });
        }
    };
    const handleOnLike = async (_id) => {
        if (token) {
            const is_like = !isLike;
            setIsLike(is_like);
            setTotalLike((prev) => (is_like ? prev + 1 : prev - 1));
            await fetchAPI({ _id, is_like });
        }
    };
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handleComment = () => {
        setIsComment(!isComment);
    };
    // call api
    const fetchAPI = async ({
        _id,
        is_like = undefined,
        is_bookmark = undefined,
    }) => {
        const result = await updateBlog({ _id, is_like, is_bookmark });
        console.log(result);
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
                        onClick={() => handleOnBookmark(data?._id)}
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
                    onClick={() => handleOnLike(data?._id)}
                >
                    {isLike ? <IoMdHeart /> : <IoIosHeartEmpty />}
                    <p>{totalLike}</p>
                </button>
                <button
                    className={cx('btn-action', { active: isComment })}
                    onClick={() => handleComment()}
                >
                    <LuMessageSquare />
                    <p>20</p>
                </button>
            </div>
            {isComment && (
                <Comment commentId={data._id} handleClose={handleComment} />
            )}
        </div>
    );
}

export default Articles;
