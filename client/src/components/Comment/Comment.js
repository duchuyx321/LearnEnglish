import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Comment.module.scss';
import Header from './components/Header';
import Body from './components/Body';

const cx = classNames.bind(styles);

const DefaultFN = () => {};

function Comment({ commentId = '', type = 'blog', handleClose = DefaultFN }) {
    const [isClose, setIsClose] = useState(false);
    // handle
    const handleIsClose = () => {
        setIsClose(true);
        setTimeout(() => {
            handleClose();
        }, 300);
    };
    return (
        <div className={cx('wrapper')} onClick={() => handleIsClose()}>
            <div
                className={cx('container', { isClose })}
                onClick={(e) => e.stopPropagation()}
            >
                <Header handleOnclose={handleIsClose} />
                <Body commentable_type={type} commentable_id={commentId} />
                <div className={cx('footer')}></div>
            </div>
        </div>
    );
}

export default Comment;
