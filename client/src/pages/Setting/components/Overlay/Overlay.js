import classNames from 'classnames/bind';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';

import styles from './Overlay.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function Overlay({ data = {}, handleOnClose = DefaultFN }) {
    console.log(data);
    const [value, setValue] = useState(data?.content || '');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button
                    className={cx('btn-close')}
                    onClick={() => handleOnClose()}
                >
                    <IoIosCloseCircleOutline />
                </button>
                <div className={cx('header')}>
                    <h3>{data?.titleOverlay}</h3>
                    <p>{data?.contentOverlay}</p>
                </div>
                <div className={cx('body')}>
                    <p>{data?.title}</p>
                    <input
                        value={value}
                        type="text"
                        placeholder={`Nhập ${data?.title}`}
                        onInput={(e) => setValue(e.target.value)}
                    />
                </div>
                <div className={cx('action')}>
                    <Button
                        primary
                        large
                        disabled={value.length === 0 || value === data?.content}
                    >
                        Lưu Lại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Overlay;
