/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { useEffect } from 'react';

import styles from './HeaderLearning.module.scss';
import images from '~/assets';
const cx = classNames.bind(styles);

function HeaderLearning({ data = {} }) {
    useEffect(() => {}, []);
    // call api

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-onBack')}>
                    <Link to="/" className={cx('back-btn')}>
                        <MdArrowBackIos />
                    </Link>
                    <Link to={'/'} className={cx('logo')}>
                        <img src={images.logo} alt="Logo" />
                    </Link>
                </div>
                <div className={cx('course-title')}>{data?.courseName}</div>
            </div>
            <div className={cx('action')}></div>
        </div>
    );
}

export default HeaderLearning;
