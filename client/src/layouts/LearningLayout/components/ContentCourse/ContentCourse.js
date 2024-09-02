/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';

import styles from './ContentCourse.module.scss';

const cx = classNames.bind(styles);

function LearningLayout({ data = [], progress = {} }) {
    const location = useLocation();

    // useMemo
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );
    const id = useMemo(() => searchParams.get('id'), [searchParams]);
    const findLessonIndex = useCallback((lessons, id) => {
        return lessons?.findIndex((lesson) => lesson._id === id) ?? 0;
    }, []);
    const indexProgress = useMemo(
        () => findLessonIndex(data?.lessons, progress?.lessonID),
        [data.lessons, id],
    );
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
                            active: id === item?._id,
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
