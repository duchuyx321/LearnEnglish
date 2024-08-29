/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './LearningLayout.module.scss';

import HeaderLearning from '~/layouts/LearningLayout/components/HeaderLearning';
import ContentCourse from '~/layouts/LearningLayout/components/ContentCourse';
import { combinedByCourseID } from '~/service/LessonService';
import FooterLearning from './components/FooterLearning';

const cx = classNames.bind(styles);

function LearningLayout({ children }) {
    const [resultLesson, setResultLesson] = useState([]);
    const params = useParams();
    useEffect(() => {
        const slug = params.slug;
        // call api function
        fetchCourseAPI(slug);
    }, []);
    // call api
    // const fetchApi
    const fetchCourseAPI = async (slug) => {
        const result = await combinedByCourseID(slug);
        setResultLesson(result);
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <HeaderLearning data={resultLesson} />
            </header>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('inner')}>{children}</div>
                    <div className={cx('description')}>
                        <FooterLearning data={resultLesson?.lessons} />
                    </div>
                </div>
                <div className={cx('sidebar')}>
                    <ContentCourse data={resultLesson?.lessons} />
                </div>
            </div>
        </div>
    );
}

export default LearningLayout;
