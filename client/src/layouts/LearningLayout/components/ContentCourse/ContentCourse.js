/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './ContentCourse.module.scss';

const cx = classNames.bind(styles);

function LearningLayout({ data = [] }) {
    const location = useLocation();

    // useMemo
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );
    const id = useMemo(() => searchParams.get('id'), [searchParams]);

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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearningLayout;
