/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './Success.module.scss';
import { IconNavigation } from '~/components/Icon';
import { successGG } from '~/service/SuccessService';

const cx = classNames.bind(styles);

function Success() {
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (params) {
            const _id = params.id;
            fetchAPISuccessGG({ _id });
        }
    }, [params]);
    // fetch api
    const fetchAPISuccessGG = async ({ _id }) => {
        const result = await successGG({ _id });
        localStorage.setItem('token', result.meta.token);
        navigate('/');
        window.location.reload();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1>LearnEnglish</h1>
                </div>
                <div className={cx('body')}>
                    <IconNavigation
                        width="35rem"
                        height="35rem"
                        className={cx('Icon')}
                        fill="#fe2c55"
                    />
                    <div className={cx('content')}>
                        Đang Chuyển hướng dữ liệu......
                    </div>
                    <div className={cx('loading')}>
                        <div className={cx('layout3')}>
                            <div className={cx('layout3-1')}></div>
                            <div className={cx('layout3-2')}></div>
                            <div className={cx('layout3-3')}></div>
                            <div className={cx('layout3-4')}></div>
                            <div className={cx('layout3-5')}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;
