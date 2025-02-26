import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';

import styles from './Security.module.scss';
import ListItem from '~/pages/Setting/components/ListItem';

const cx = classNames.bind(styles);
// LIST
const LIST_AUTH = {
    title: {
        title: 'Đăng nhập & khôi phục',
        content: 'Quản lý mật khẩu và xác minh 2 bước.',
    },
    content: [
        {
            key: 'password',
            title: 'Đổi mật khẩu',
        },
        {
            key: '2fa',
            title: 'Xác minh 2 bước',
        },
    ],
};

function Security() {
    const navigate = useNavigate();
    const handleOnClose = () => {
        navigate(-1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <button
                    className={cx('btn-close')}
                    onClick={() => handleOnClose()}
                >
                    <IoIosCloseCircleOutline />
                </button>
                <div className={cx('title')}>
                    <h3>Thông tin cá nhân</h3>
                    <p>Quản lý thông tin cá nhân của bạn.</p>
                </div>
            </div>
            <div className={cx('inner')}>
                <ListItem
                    ListItem={LIST_AUTH.content}
                    title={LIST_AUTH.title}
                    type="Security"
                />
            </div>
        </div>
    );
}

export default Security;
