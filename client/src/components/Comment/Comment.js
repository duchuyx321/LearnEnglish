import classNames from 'classnames/bind';
// import { useRef, useState } from 'react';

import styles from './Comment.module.scss';
import Header from './components/Header';
import Body from './components/Body';

const cx = classNames.bind(styles);

const DefaultFN = () => {};

function Comment({ commentId = '', type = 'blog', handleClose = DefaultFN }) {
    return (
        <div className={cx('wrapper')} onClick={() => handleClose()}>
            <div
                className={cx('container')}
                onClick={(e) => e.stopPropagation()}
            >
                <Header handleOnclose={handleClose} />
                <Body />
                <div className={cx('footer')}></div>
            </div>
        </div>
    );
}

export default Comment;
