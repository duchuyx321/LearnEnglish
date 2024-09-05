/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';

import styles from './HeaderLearning.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

function HeaderLearning({ data = {} }) {
    const navigate = useNavigate();
    // call api
    const handleOnBack = () => {
        navigate(-1);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-onBack')}>
                    <button
                        className={cx('back-btn')}
                        onClick={() => handleOnBack()}
                    >
                        <MdArrowBackIos />
                        <p>Trở Lại</p>
                    </button>
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
