import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './Comment.module.scss';
import Header from './components/Header';
import Body from './components/Body';

const cx = classNames.bind(styles);

function Comment({ commentId = '', type = 'blog' }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Header />
                <Body />
                <div className={cx('footer')}></div>
            </div>
        </div>
    );
}

export default Comment;
