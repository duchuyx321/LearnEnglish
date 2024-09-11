import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { RiLoader2Fill } from 'react-icons/ri';

import styles from './Login.module.scss';
import Button from '~/components/Button';
import { login } from '~/service/AuthService';

const cx = classNames.bind(styles);

function Login() {
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [waring, setWaring] = useState(null);
    const [waringPass, setWaringPass] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (password.length < 8 && password.length > 0) {
            setWaringPass('Mật Khẩu ít nhất 8 kí tự');
        } else {
            setWaringPass(null); // Xóa cảnh báo khi password hợp lệ
        }
    }, [password]);
    useEffect(() => {
        if (loginIdentifier.length < 8 && loginIdentifier.length > 0) {
            setWaring('Ít nhất 6 kí tự');
        } else {
            setWaring(null); // Xóa cảnh báo khi loginIdentifier hợp lệ
        }
    }, [loginIdentifier]);
    useEffect(() => {
        if (loginIdentifier.length < 8 || password.length < 8) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [loginIdentifier, password]);

    // handle
    const handlePreventDefault = (e) => {
        e.preventDefault();
    };
    const handleOnValue = (e) => {
        setLoginIdentifier(e);
    };
    const handleOnValuePass = (e) => {
        setPassword(e);
    };
    const handleOnSubmit = async (e) => {
        setIsDisabled(true);
        setLoad(true);
        const result = await login(loginIdentifier, password);
        if (result?.error === 'Email') {
            setWaring(result?.message);
        } else if (result?.error === 'Pass') {
            setWaringPass(result?.message);
        } else if (result?.meta) {
            localStorage.setItem('token', result?.meta?.newAccessToken);
            window.location.reload();
        }
        setLoad(false);
    };

    return (
        <form
            onSubmit={(e) => handlePreventDefault(e)}
            className={cx('wrapper')}
        >
            <div className={cx('boxInput')}>
                <input
                    type="text"
                    placeholder="Email Hoặc Username"
                    onInput={(e) => handleOnValue(e.target.value)}
                />
                {waring && <p>{waring}</p>}
            </div>
            <div className={cx('boxInput')}>
                <input
                    type="password"
                    placeholder="Mật Khẩu"
                    onInput={(e) => handleOnValuePass(e.target.value)}
                />
                {waringPass && <p>{waringPass}</p>}
            </div>
            <div className={cx('footer')}>
                <Button
                    primary
                    large
                    disabled={isDisabled}
                    className={cx('submit')}
                    onClick={() => handleOnSubmit()}
                >
                    Đăng Nhập
                </Button>
                <div className={cx({ spin: load })}>
                    <RiLoader2Fill />
                </div>
            </div>
        </form>
    );
}

export default Login;
