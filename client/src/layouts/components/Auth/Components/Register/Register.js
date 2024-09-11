import classNames from 'classnames/bind';
import { useState } from 'react';
import { RiLoader2Fill } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa6';

import styles from './Register.module.scss';
import Button from '~/components/Button';
import { checkRegister } from '~/service/userService';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Login() {
    const [load, setLoad] = useState(false);
    const [isPass, setIsPass] = useState(false);
    const [isRepeatPass, setIsRepeatPass] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const debounceUsername = useDebounce(username, 2000);
    const debounceEmail = useDebounce(email, 2000);

    // handle
    const handlePreventDefault = (e) => {
        e.preventDefault();
    };
    return (
        <form
            onSubmit={(e) => handlePreventDefault(e)}
            className={cx('wrapper')}
        >
            <div className={cx('boxInput')}>
                <input type="text" placeholder="Nhập username" />
                <p></p>
            </div>
            <div className={cx('boxInput')}>
                <input type="text" placeholder="Nhập email" />
                <p></p>
            </div>
            <div className={cx('boxInput')}>
                <input type="password" placeholder="nhập password" />
                <button
                    className={cx('btn-eye')}
                    onClick={() => setIsPass(!isPass)}
                >
                    {isPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
                <p></p>
            </div>
            <div className={cx('boxInput')}>
                <input type="password" placeholder="nhập lại password" />
                <button
                    className={cx('btn-eye')}
                    onClick={() => setIsRepeatPass(!isRepeatPass)}
                >
                    {isRepeatPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
                <p></p>
            </div>
            <div className={cx('footer')}>
                <Button primary large className={cx('submit')}>
                    Đăng Kí
                </Button>
                <div className={cx({ spin: load })}>
                    <RiLoader2Fill />
                </div>
            </div>
        </form>
    );
}

export default Login;
