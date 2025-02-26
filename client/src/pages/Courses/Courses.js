/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoDot } from 'react-icons/go';

import styles from './Course.module.scss';
import { combinedByCourseID } from '~/service/LessonService';
import ListItem from './components/PopperItem';
import ListLesson from './components/ListLesson';

const cx = classNames.bind(styles);

function Courses() {
    const params = useParams();
    const [resultRender, setResultRender] = useState();

    useEffect(() => {
        if (params.slug) {
            fetchAPILesson(params.slug);
        }
    }, []);
    // call api
    const fetchAPILesson = async (course_slug) => {
        const result = await combinedByCourseID(course_slug);
        if (result) {
            setResultRender(result);
        }
    };
    // function handle
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>{resultRender?.courseName}</h2>
                    <div className={cx('textContent')}>
                        {resultRender?.courseDescription}
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('title-course')}>
                        <h2>Nội Dung Khóa Học</h2>
                        <div className={cx('total-lessons')}>
                            <div className={'btn-dot'}>
                                <GoDot />
                            </div>
                            <p>Tổng số bài học :</p>
                            <p>{resultRender?.lessons?.length}</p>
                        </div>
                    </div>
                    <ListLesson data={resultRender?.lessons} />
                </div>
            </div>
            <div className={cx('purchaseBadge')}>
                <ListItem data={resultRender} />
            </div>
        </div>
    );
}

export default Courses;
