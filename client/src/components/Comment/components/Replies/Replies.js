/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Replies.module.scss';
import { getComments } from '~/service/CommentService';
import CommentItem from '../CommentItem';

const cx = classNames.bind(styles);

function Replies({ commentable_id = '', commentable_type = '' }) {
    const [renderComments, setRenderComments] = useState([]);
    const [isRender, setIsRender] = useState(false);
    useEffect(() => {
        fetchAPIComments({ commentable_id, commentable_type });
    }, [isRender]);
    // handle
    const handleOnReset = () => {
        setIsRender((prev) => !prev);
    };
    // fetch API
    const fetchAPIComments = async ({ commentable_id, commentable_type }) => {
        const result = await getComments({ commentable_type, commentable_id });
        setRenderComments(result);
    };
    return (
        <div className={cx('wrapper')}>
            {renderComments.map((item) => (
                <CommentItem
                    key={item._id}
                    data={item}
                    commentable_type={commentable_type}
                    handleFetchAPI={handleOnReset}
                />
            ))}
        </div>
    );
}

export default Replies;
