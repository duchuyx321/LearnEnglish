import classNames from 'classnames/bind';
import { CiBookmark } from 'react-icons/ci';
import { IoBookmark } from 'react-icons/io5';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { LuMessageSquare } from 'react-icons/lu';
import { useState } from 'react';

import styles from './Articles.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Articles() {
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
                        <Image src="" alt="avatar" />
                    </div>
                    <div className={cx('profile')}>
                        <h3>Đức Huy</h3>
                        <p>5 phút trước </p>
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
                        [đồ án] Mình cần làm gấp 1 app Flutter về thời tiết (tầm
                        3 4 trang) Yêu cầu: 1. Hoàn thành trước 12/9 2. Chức
                        năng: hiển thị thông tin thời tiết (api tuỳ bạn chọn),
                        kết nối Bluetooth, thông qua Bluetooth này tiếp nhận
                        thông tin và hiển thị 4. Yêu cầu kỹ thuật: code đơn giản
                        nhất có thể, dễ hiểu, dễ đọc không cần bloc…, có
                        comments, có data models, ios + android.
                    </p>
                    <button
                        className={cx('btn-toggle')}
                        onClick={() => handleToggle()}
                    >
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                </div>
                <Image src="" alt="ảnh nền" className={cx('image')} />
            </div>
            <div className={cx('footer')}>
                <button
                    className={cx('btn-action', { active: isLike })}
                    onClick={() => handleOnLike()}
                >
                    {isLike ? <IoMdHeart /> : <IoIosHeartEmpty />}
                    <p>20</p>
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
