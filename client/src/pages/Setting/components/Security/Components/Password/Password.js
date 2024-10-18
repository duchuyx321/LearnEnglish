import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';

import styles from './Password.module.scss';
import Button from '~/components/Button';

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

function Password() {
    const [visibleIndex, setVisibleIndex] = useState(null);
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
        confirm: '',
    });
    const isAnyWarning = Object.values(warnings).some((item) => item !== null);

    useEffect(() => {
        const newWarnings = {};
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
            } else if (passwordValues.new.length < 8) {
                newWarnings.new = 'Mật khẩu mới phải có ít nhất 8 kí tự';
            } else {
                newWarnings.new = null;
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
    const handleOnSave = () => {
        //
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
