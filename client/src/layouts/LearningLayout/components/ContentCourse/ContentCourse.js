/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';

import styles from './ContentCourse.module.scss';

const cx = classNames.bind(styles);

function LearningLayout({ data = [], progress = {} }) {
    const location = useLocation();
    const [newId, setNewId] = useState(null);
    const [indexProgress, setIndexProgress] = useState(0);

    // useMemo
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setNewId(searchParams.get('id'));
    }, [location]);
    useEffect(() => {
        const findLessonIndex = (lessons, id) => {
            return lessons?.findIndex((lesson) => lesson._id === id) ?? -1;
        };

        const newIndexProgress = findLessonIndex(data, progress?.lessonID);
        setIndexProgress(newIndexProgress);
    }, [data, progress]);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('Header')}>
                <h5>Nội Dung Khóa Học</h5>
            </header>
            <div className={cx('body')}>
                {data.map((item, index) => (
                    <div
                        key={item._id}
                        className={cx('inner', {
                            active: newId === item?._id,
                        })}
                    >
                        <div className={cx('title')}>
                            <span>{index + 1}.</span>
                            <h4>{item.lessonName}</h4>
                        </div>
                        {index < indexProgress && (
                            <div className={cx('isCheck')}>
                                <FaCircleCheck />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearningLayout;
