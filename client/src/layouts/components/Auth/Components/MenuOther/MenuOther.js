import classNames from 'classnames/bind';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';

import styles from './MenuOther.module.scss';

const cx = classNames.bind(styles);

const MENU_OTHER = [
    {
        key: 'google',
        content: 'Tiếp Tục Với Google',
        icon: <FcGoogle />,
    },
    {
        key: 'facebook',
        content: 'Tiếp Tục Với Facebook',
        icon: <FcGoogle />,
    },
    {
        key: 'std',
        content: 'Tiếp Tục Với Google',
        icon: <FcGoogle />,
    },
    {
        key: 'github',
        content: 'Tiếp Tục Với Google',
        icon: <FcGoogle />,
    },
];

function MenuOther() {
    return (
        <div className={cx('wrapper')}>
            {MENU_OTHER.map((item) => (
                <button key={item.key} className={cx('boxContainer')}>
                    <div className={cx('icon')}>{item.icon}</div>
                    <div className={cx('content')}>{item.content}</div>
                </button>
            ))}
        </div>
    );
}

export default MenuOther;
