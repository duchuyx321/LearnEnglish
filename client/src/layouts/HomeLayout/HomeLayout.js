import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './HomeLayout.module.scss';
import HeaderDefault from '~/layouts/components/HeaderDefault';
import SideBarDefault from '~/layouts/components/SideBarDefault';
import Auth from '~/layouts/components/Auth';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleOnAuth = (is_login) => {
        setIsAuth(true);
        setIsLogin(is_login);
    };
    const handleClose = () => {
        setIsAuth(false);
    };
    return (
        <div className={cx('wrapper')}>
            <HeaderDefault handleAuth={handleOnAuth} />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <SideBarDefault />
                </div>
                <div className={cx('content')}>
                    <div className={cx('inner')}>{children}</div>
                </div>
            </div>
            {isAuth && (
                <div className={cx('auth')}>
                    <Auth is_login={isLogin} handleOnClose={handleClose} />
                </div>
            )}
        </div>
    );
}

export default HomeLayout;
