import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import { combined } from '~/service/CourseService';
import ListItem from '~/components/ListItem';

const cx = classNames.bind(styles);

function Home() {
    const [courseRender, setCourseRender] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await combined();
            setCourseRender(result);
        };
        fetchAPI();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('title-course')}>
                        <h3 className={cx('title')}>Khóa Học Miễn Phí</h3>
                        <Link to="/learning-paths" className={cx('learnPath')}>
                            Xem Lộ trình
                        </Link>
                    </div>
                    <ListItem data={courseRender} />
                </div>
            </div>
        </div>
    );
}

export default Home;
