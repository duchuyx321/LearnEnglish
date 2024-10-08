import classNames from 'classnames/bind';
import { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

import styles from './Auth.module.scss';
import MenuOther from './Components/MenuOther';
import Login from './Components/Login';
import Register from './Components/Register';

const cx = classNames.bind(styles);

const defaultFn = () => {};
function Auth({ is_login, handleOnClose = defaultFn }) {
    const [isLogin, setIsLogin] = useState(is_login);

    // handle
    const handleOnConvert = () => {
        setIsLogin(!isLogin);
    };
    return (
        <div className={cx('wrapper', !isLogin ? 'is_login' : 'is_register')}>
            <div className={cx('header')}>
                <h3>
                    {isLogin
                        ? 'Đăng Nhập Vào LearnEnglish'
                        : 'Đăng Kí Vào LearnEnglish'}
                </h3>
                <button className={cx('close')} onClick={() => handleOnClose()}>
                    <IoIosCloseCircle />
                </button>
            </div>
            <div className={cx('body')}>
                <div className={cx('content')}>
                    {isLogin ? <Login /> : <Register />}
                </div>
                <div className={cx('other')}>
                    <MenuOther />
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('convert')}>
                    <p>
                        {isLogin
                            ? 'Bạn Không Có tài khoản?'
                            : 'Bạn Đã Có Tài Khoản?'}
                    </p>
                    <button onClick={() => handleOnConvert()}>
                        {isLogin ? 'Đăng Kí' : 'Đăng Nhập'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
