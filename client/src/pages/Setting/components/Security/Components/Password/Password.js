import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';

import styles from './Password.module.scss';
import Button from '~/components/Button';
import { editPass } from '~/service/AuthService';

const cx = classNames.bind(styles);
const LIST_INPUT = [
    {
        key: 'current',
        title: 'Mật khẩu hiện tại',
        placeholder: 'Nhập mật khẩu hiện tại của bạn',
    },
    {
        key: 'new',
        title: 'Mật khẩu mới',
        placeholder: 'Nhập mật khẩu mới của bạn',
    },
    {
        key: 'confirm',
        title: 'Mật khẩu mới',
        placeholder: 'Nhập lại mật khẩu mới của bạn',
    },
];
// vales check
const hasUppercase = /[A-Z]/; //chữ viết hoa
const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; //kí tự đặc biệt
const hasNumber = /\d/; //số

//  number
const numberOfStrengthBars = 4;

function Password() {
    const [visibleIndex, setVisibleIndex] = useState(null);
    const [strength, setStrength] = useState(0);
    const [isDirty, setIsDirty] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [passwordValues, setPasswordValues] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [warnings, setWarnings] = useState({
        current: '',
        new: '',
        check: '',
        confirm: '',
    });
    const isAnyWarning = Object.values(warnings).some(
        (warning) => warning !== null,
    );
    // check strength vales password
    const checkStrength = (password) => {
        let strengthLevel = 0;

        // check uppercase in password
        if (hasUppercase.test(password)) {
            strengthLevel += 1;
        }
        //check special char in password
        if (hasSpecialChar.test(password)) {
            strengthLevel += 1;
        }
        // check number in password
        if (hasNumber.test(password)) {
            strengthLevel += 1;
        }
        // check length password
        if (password.length > 8) {
            strengthLevel += 1;
        }
        return strengthLevel;
    };

    useEffect(() => {
        const newWarnings = {
            current: '',
            new: '',
            check: '',
            confirm: '',
        };
        // check current password
        if (isDirty.current) {
            if (passwordValues.current.length === 0) {
                newWarnings.current = 'Vui lòng nhập mật khẩu hiện tại ';
            } else if (passwordValues.current.length < 8) {
                newWarnings.current = 'Mật khẩu phải có ít nhất 8 kí tự';
            } else {
                newWarnings.current = null;
            }
        }
        // check new password
        if (isDirty.new) {
            if (passwordValues.new.length === 0) {
                newWarnings.new = 'Vui lòng nhập mật khẩu mới';
            } else {
                newWarnings.new = null;
            }
            //check strength password
            const strengthLevel = checkStrength(passwordValues.new);
            setStrength(strengthLevel);
            if (strengthLevel === 1 || strengthLevel === 2) {
                newWarnings.check = 'Mật khẩu yếu';
            } else if (strengthLevel === 3) {
                newWarnings.check = 'Mật khẩu trung bình';
            } else if (strengthLevel === 4) {
                newWarnings.check = null; // Mật khẩu mạnh, không có cảnh báo
            }
        }
        // check new passwords confirm
        if (isDirty.confirm) {
            if (passwordValues.confirm.length === 0) {
                newWarnings.confirm = 'Vui lòng nhập lại mật khẩu mới';
            } else if (passwordValues.confirm !== passwordValues.new) {
                newWarnings.confirm = 'Mật khẩu không khớp';
            } else {
                newWarnings.confirm = null;
            }
        }
        setWarnings(newWarnings);
    }, [passwordValues, isDirty]);
    // handle
    const handleOnSave = async () => {
        const token = localStorage.getItem('token');
        if (!isAnyWarning && token) {
            const result = await editPass({
                password: passwordValues.current,
                newPassword: passwordValues.new,
            });
            if (result.error) {
                setWarnings({ ...warnings, [result.type]: result.message });
            }
        }
    };
    // hiển thị mật khẩu
    const handleTogglePassword = (type) => {
        setVisibleIndex(visibleIndex === type ? null : type);
    };
    // lấy dữ liệu
    const handleOnInput = (key, value) => {
        setPasswordValues({ ...passwordValues, [key]: value });
        setIsDirty({
            ...isDirty,
            [key]: true,
        });
    };

    // function render
    const RenderStrengthBar = () =>
        Array.from({ length: numberOfStrengthBars }, (_, index) => (
            <div
                key={index}
                className={cx('bar_item', {
                    [`level_${strength}`]: index + 1 <= strength,
                })}
            ></div>
        ));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3>Đổi Mật Khẩu</h3>
                <p>
                    Mật khẩu của bạn cần phải có tối thiểu 8 kí tự, bao gồm cả
                    chữ số, chữ cái và ký tự đặc biệt (!@#$%....)
                </p>
            </div>
            <div className={cx('body')}>
                {LIST_INPUT.map((item) => (
                    <div key={item.key} className={cx('inner')}>
                        <div className={cx('labelGroup')}>
                            <label htmlFor={item.key}>{item.title}</label>
                        </div>
                        <div className={cx('inputWrap')}>
                            <input
                                id={item.key}
                                type={
                                    visibleIndex === item.key
                                        ? 'text'
                                        : 'password'
                                }
                                value={passwordValues[item.key]}
                                placeholder={item.placeholder}
                                onInput={(e) =>
                                    handleOnInput(item.key, e.target.value)
                                }
                            />
                            <button
                                className={cx('rightIcon')}
                                onClick={() => handleTogglePassword(item.key)}
                            >
                                {visibleIndex === item.key ? (
                                    <GoEyeClosed />
                                ) : (
                                    <GoEye />
                                )}
                            </button>
                        </div>
                        {item.key === 'new' && (
                            <div className={cx('strengthBar')}>
                                <div className={cx('bar')}>
                                    <RenderStrengthBar />
                                </div>
                                <div className={cx('strength_message')}>
                                    <p>
                                        {warnings.check === null
                                            ? 'Mật khẩu mạnh'
                                            : warnings.check}
                                    </p>
                                </div>
                            </div>
                        )}
                        {warnings[item.key] && (
                            <div className={cx('message')}>
                                {warnings[item.key]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={cx('action')}>
                <Button
                    primary
                    large
                    disabled={isAnyWarning}
                    onClick={() => handleOnSave()}
                >
                    Lưu Lại
                </Button>
            </div>
        </div>
    );
}

export default Password;
