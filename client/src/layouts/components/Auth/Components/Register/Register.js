import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { RiLoader2Fill } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa6';

import styles from './Register.module.scss';
import Button from '~/components/Button';
import { checkRegister } from '~/service/userService';
import { useDebounce } from '~/hooks';
import { sendCode, checkCode } from '~/service/ApiService';
import { register } from '~/service/AuthService';

const cx = classNames.bind(styles);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function Login() {
    const [load, setLoad] = useState(false);
    const [isPass, setIsPass] = useState(false);
    const [isRepeatPass, setIsRepeatPass] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [token, setToken] = useState('');
    const [count, setCount] = useState('Gửi Mã');
    const [isCount, setIsCount] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [waringUsername, setWaringUsername] = useState(null);
    const [waringEmail, setWaringEmail] = useState(null);
    const [waringPassword, setWaringPassword] = useState(null);
    const [waringPasswordRepeat, setWaringPasswordRepeat] = useState(null);
    const [waringToken, setWaringToken] = useState(null);

    const delay = 1000;
    const debounceUsername = useDebounce(username, delay);
    const debounceEmail = useDebounce(email, delay);
    const debouncePass = useDebounce(password, delay);
    const debounceRepeatPass = useDebounce(passwordRepeat, delay);
    const debounceToken = useDebounce(token, delay);

    // useEffect

    // username
    useEffect(() => {
        if (debounceUsername === '') {
            return;
        } else if (debounceUsername.length < 8) {
            setWaringUsername('Username ít nhất 8 kí tự');
            return;
        }
        fetchCheckRegisterApi({
            username: debounceUsername,
        });
    }, [debounceUsername]);
    // email
    useEffect(() => {
        if (debounceEmail === '') {
            return;
        } else if (!validateEmail(debounceEmail)) {
            setWaringEmail('Email không hợp lệ');
            return;
        }
        fetchCheckRegisterApi({
            email: debounceEmail,
        });
    }, [debounceEmail]);
    // pass
    useEffect(() => {
        if (debouncePass.length < 8 && debouncePass.length > 0) {
            setWaringPassword('Password ít nhất 8 kí tự');
            return;
        }
        setWaringPassword('');
    }, [debouncePass]);
    // repeat password
    useEffect(() => {
        if (debouncePass !== debounceRepeatPass) {
            setWaringPasswordRepeat('Mật khẩu không giống nhau');
            return;
        }
        setWaringPasswordRepeat('');
    }, [debounceRepeatPass]);
    // token
    useEffect(() => {
        if (debounceToken === '') {
            return;
        } else if (debounceToken.length < 6 && debounceToken.length > 0) {
            setWaringToken('Token gồm 6 kí tư');
            return;
        }
        fetchCheckTokenApi({ email: debounceEmail, token: debounceToken });
    }, [debounceToken]);
    // count
    useEffect(() => {
        let timer;

        if (isCount) {
            // Set up the interval to count down
            timer = setInterval(() => {
                setCount((prevCount) => {
                    if (prevCount <= 1) {
                        clearInterval(timer);
                        setIsCount(false);
                        setCount('Gửi Lại');
                        return 0;
                    }
                    return prevCount - 1;
                });
            }, 1000);
        } else {
            // Clear the timer if isCount is false
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isCount]);
    // SUBMIT
    useEffect(() => {
        if (
            (waringEmail === '',
            waringPassword === '',
            waringUsername === '',
            waringPasswordRepeat === '',
            waringToken === '')
        ) {
            setDisabled(false);
            return;
        }
        setDisabled(true);
    }, [
        waringEmail,
        waringUsername,
        waringPassword,
        waringPasswordRepeat,
        waringToken,
    ]);

    // call api
    const fetchCheckRegisterApi = async ({
        username = undefined,
        email = undefined,
    }) => {
        const result = await checkRegister({ username, email });
        if (result?.error === 'username') {
            setWaringUsername(result?.message);
            return;
        } else if (result?.error === 'email') {
            setWaringEmail(result?.message);
            return;
        } else if (result.message === 'check email successful') {
            setWaringEmail('');
            return;
        } else if (result.message === 'check username successful') {
            setWaringUsername('');
            return;
        }
    };
    const fetchCheckTokenApi = async ({ token, email }) => {
        const result = await checkCode({ email, token });
        if (result.error) {
            setWaringToken(result.message);
            return;
        }
        setWaringToken('');
    };
    // handle
    const handlePreventDefault = (e) => {
        e.preventDefault();
    };
    const handleOnSendCode = async () => {
        const result = await sendCode({ email: debounceEmail });
        if (result.error) {
            setWaringToken(result.message);
            return;
        }
        setIsCount(true);
        setCount(120);
    };
    const handleInputToken = (e) => {
        const UpperCaseValue = e.toUpperCase();
        setToken(UpperCaseValue);
    };
    const handleOnSubmitRegister = async () => {
        setLoad(true);
        // setDisabled(true);
        const result = await register(
            debounceUsername,
            debounceEmail,
            debouncePass,
        );
        if (!result.error) {
            localStorage.setItem('token', result.meta.token);
            window.location.reload();
        }
        setLoad(false);
    };
    return (
        <form
            onSubmit={(e) => handlePreventDefault(e)}
            className={cx('wrapper')}
        >
            {/* input */}
            <div className={cx('boxInput')}>
                <input
                    type="text"
                    placeholder="Nhập username"
                    onInput={(e) => setUsername(e.target.value)}
                />
                {waringUsername && <p>{waringUsername}</p>}
            </div>
            <div className={cx('boxInput')}>
                <input
                    type="text"
                    placeholder="Nhập email"
                    onInput={(e) => setEmail(e.target.value)}
                />
                {waringEmail && <p>{waringEmail}</p>}
            </div>
            <div className={cx('boxInput')}>
                <input
                    type={isPass ? 'text' : 'password'}
                    placeholder="nhập password"
                    onInput={(e) => setPassword(e.target.value)}
                />
                <button
                    className={cx('btn-eye')}
                    onClick={() => setIsPass(!isPass)}
                >
                    {isPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
                {waringPassword && <p>{waringPassword}</p>}
            </div>
            <div className={cx('boxInput')}>
                <input
                    type={isRepeatPass ? 'text' : 'password'}
                    placeholder="nhập lại password"
                    onInput={(e) => setPasswordRepeat(e.target.value)}
                />
                <button
                    className={cx('btn-eye')}
                    onClick={() => setIsRepeatPass(!isRepeatPass)}
                >
                    {isRepeatPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
                {waringPasswordRepeat && <p>{waringPasswordRepeat}</p>}
            </div>
            {/* send token */}
            <div className={cx('sendToken')}>
                <div>
                    <input
                        value={token}
                        type="text"
                        maxLength="6"
                        placeholder="Nhập Token"
                        onInput={(e) => handleInputToken(e.target.value)}
                    />
                    {waringEmail === '' && (
                        <Button
                            outline
                            onClick={() => handleOnSendCode()}
                            disabled={isCount}
                        >
                            {count}
                        </Button>
                    )}
                </div>
                {waringToken && <p>{waringToken}</p>}
            </div>
            {/* submit */}
            <div className={cx('footer')}>
                <Button
                    primary
                    disabled={disabled}
                    large
                    className={cx('submit')}
                    onClick={() => handleOnSubmitRegister()}
                >
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
