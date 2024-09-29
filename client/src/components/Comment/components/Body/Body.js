import classNames from 'classnames/bind';
import { useState } from 'react';
import { RiBracesLine } from 'react-icons/ri';

import styles from './Body.module.scss';
import CommentItem from '../CommentItem';

const cx = classNames.bind(styles);

function Body() {
    const [renderComments, setRenderComments] = useState([]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div>
                    <span>{renderComments.length || '0'}</span>
                    Bình Luận
                </div>
                <div className={cx('waring')}>
                    Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
                </div>
            </div>
            {renderComments.length === 0 ? (
                <div className={cx('hollow')}>
                    <div>
                        <RiBracesLine />
                    </div>
                    <p>Chưa có bình luận nào, hãy là người đầu tiên nào!</p>
                </div>
            ) : (
                <div className={cx('body')}>
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                </div>
            )}
        </div>
    );
}

export default Body;
