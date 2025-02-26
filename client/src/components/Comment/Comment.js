/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Comment.module.scss';
import Header from './components/Header';
import Body from './components/Body';
import { getComments } from '~/service/CommentService';

const cx = classNames.bind(styles);

const DefaultFN = () => {};

function Comment({ commentId = '', type = 'blog', handleClose = DefaultFN }) {
    const [isClose, setIsClose] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const handleOnReset = () => {
        setIsReset((prev) => !prev);
    };
    const [renderComments, setRenderComments] = useState([]);
    useEffect(() => {
        fetchComments({ commentable_id: commentId, commentable_type: type });
    }, [isReset]);
    // handle
    const handleIsClose = () => {
        setIsClose(true);
        setTimeout(() => {
            handleClose();
        }, 300);
    };
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
        <div className={cx('wrapper')} onClick={() => handleIsClose()}>
            <div
                className={cx('container', { isClose })}
                onClick={(e) => e.stopPropagation()}
            >
                <Header
                    commentable_id={commentId}
                    commentable_type={type}
                    handleOnclose={handleIsClose}
                    handleReset={handleOnReset}
                />
                <Body
                    data={renderComments}
                    handleFetchAPI={handleOnReset}
                    isFetchAPI={isReset}
                    commentable_type={type}
                />
                <div className={cx('footer')}></div>
            </div>
        </div>
    );
}

export default Comment;
