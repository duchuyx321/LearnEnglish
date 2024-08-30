/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import styles from './LearningLayout.module.scss';

import HeaderLearning from '~/layouts/LearningLayout/components/HeaderLearning';
import ContentCourse from '~/layouts/LearningLayout/components/ContentCourse';
import { combinedByCourseID } from '~/service/LessonService';
import DescriptionLearning from './components/DescriptionLearning';
import Footer from './components/Footer';
import { useScreenWidth } from '~/hooks';

const cx = classNames.bind(styles);

function LearningLayout({ children }) {
    const [resultLesson, setResultLesson] = useState([]);
    const [hiddenSidebar, setHiddenSidebar] = useState(true);
    const params = useParams();
    const location = useLocation();

    // useMemo
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );
    const id = useMemo(() => searchParams.get('id'), [searchParams]);
    useEffect(() => {
        const slug = params.slug;
        // call api function
        fetchCourseAPI(slug);
    }, [id]);
    // call api
    const screenWidth = useScreenWidth();
    useEffect(() => {
        if (screenWidth <= 1024) {
            setHiddenSidebar(false);
        } else {
            setHiddenSidebar(true);
        }
    }, [screenWidth]);
    // const fetchApi
    const fetchCourseAPI = async (slug) => {
        const result = await combinedByCourseID(slug);
        setResultLesson(result);
    };
    const handleOnHideSidebar = () => {
        setHiddenSidebar(!hiddenSidebar);
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
                        <DescriptionLearning data={resultLesson?.lessons} />
                    </div>
                </div>
                {hiddenSidebar && (
                    <div className={cx('sidebar')}>
                        <ContentCourse data={resultLesson?.lessons} />
                    </div>
                )}
            </div>
            <footer className={cx('footer')}>
                <Footer
                    handleOnHiddenSidebar={handleOnHideSidebar}
                    data={resultLesson}
                />
            </footer>
        </div>
    );
}

export default LearningLayout;
