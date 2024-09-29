import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import styles from './Header.module.scss';
import Image from '~/components/Image';
import Input from '../Input';

const cx = classNames.bind(styles);

const DefaultFN = () => {};

function Header({ handleOnclose = DefaultFN }) {
    return (
        <div className={cx('wrapper')}>
            <button className={cx('exit')} onClick={() => handleOnclose()}>
                <IoClose />
            </button>
            <div className={cx('post')}>
                <div className={cx('user')}>
                    <Image src="" alt="" />
                </div>
                <div className={cx('comment')}>
                    <Input />
                </div>
            </div>
        </div>
    );
}

export default Header;
