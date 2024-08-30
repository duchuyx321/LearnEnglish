/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './DescriptionLearning.module.scss';
import { formatDay } from '~/service/formatTime';

const cx = classNames.bind(styles);

function DescriptionLearning({ data = [] }) {
    const [lesson, setLesson] = useState({});
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        const result = data?.filter((item) => item._id.includes(id));
        setLesson(result[0]);
    }, [data]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p> Tên Bài Học :</p>
                <h2>{lesson?.lessonName}</h2>
            </div>
            <div className={cx('time-update')}>
                <p>Cập nhật vào </p>
                <p>{formatDay(lesson?.createdAt || 0)}</p>
            </div>
            <div className={cx('description')}>
                <p>Mô Tả Khóa Học :</p>
                <p>{lesson?.lessonContent}</p>
            </div>
        </div>
    );
}

export default DescriptionLearning;
