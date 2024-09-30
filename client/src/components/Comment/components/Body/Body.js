import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { RiBracesLine } from 'react-icons/ri';

import styles from './Body.module.scss';
import CommentItem from '../CommentItem';
import { getComments } from '~/service/CommentService';

const cx = classNames.bind(styles);

function Body({ commentable_id, commentable_type }) {
    console.log({ commentable_type, commentable_id });
    const [renderComments, setRenderComments] = useState([]);
    useEffect(() => {
        fetchComments({ commentable_id, commentable_type });
    }, []);

    // fetch api
    const fetchComments = async ({
        commentable_type,
        commentable_id,
        page = 1,
        limit = 5,
    }) => {
        const result = await getComments({
            commentable_id,
            commentable_type,
            page,
            limit,
        });
        setRenderComments(result);
    };
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
                    {renderComments.map((item) => (
                        <CommentItem key={item._id} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Body;
