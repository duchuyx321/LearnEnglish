/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useLocation, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './LearningLayout.module.scss';

import HeaderLearning from '~/layouts/LearningLayout/components/HeaderLearning';
import ContentCourse from '~/layouts/LearningLayout/components/ContentCourse';
import { combinedByCourseID } from '~/service/LessonService';
import { findOneProgress } from '~/service/progressService';
import DescriptionLearning from './components/DescriptionLearning';
import Footer from './components/Footer';
import { useScreenWidth } from '~/hooks';

const cx = classNames.bind(styles);

function LearningLayout({ children }) {
    const [resultLesson, setResultLesson] = useState([]);
    const [resultProgress, setResultProgress] = useState({});
    const [hiddenSidebar, setHiddenSidebar] = useState(true);
    const params = useParams();
    const location = useLocation();
    const screenWidth = useScreenWidth();
    // useMemo
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );
    const id = useMemo(() => searchParams.get('id'), [searchParams]);
    useEffect(() => {
        const slug = params.slug;
        fetchCourseAPI(slug);
    }, [params.slug]); // Đảm bảo chỉ phụ thuộc vào params.slug nếu chỉ cần nó

    useEffect(() => {
        if (resultLesson._id) {
            fetchAPIProgress(resultLesson._id);
        }
    }, [resultLesson._id]); // Chỉ chạy khi resultLesson._id thay đổi
    useEffect(() => {
        if (screenWidth <= 1024) {
            setHiddenSidebar(false);
        } else {
            setHiddenSidebar(true);
        }
    }, [screenWidth]);
    console.log(resultLesson);
    // call api
    const fetchCourseAPI = useCallback(async (slug) => {
        const result = await combinedByCourseID(slug);
        setResultLesson(result);
    }, []);

    const fetchAPIProgress = useCallback(async (courseID) => {
        const result = await findOneProgress(courseID);
        setResultProgress(result);
    }, []);
    // handle function
    const handleOnHideSidebar = () => {
        setHiddenSidebar(!hiddenSidebar);
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <HeaderLearning data={resultLesson} progress={resultProgress} />
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
                    progress={resultProgress?.data}
                />
            </footer>
        </div>
    );
}

export default LearningLayout;
