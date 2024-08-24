import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import { combined } from '~/service/CourseService';
import images from '~/assets';

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
    const typeCourse = 'Miễn Phí';
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
                    <div className={cx('courses')}>
                        {courseRender.map((item) => (
                            <div key={item._id} className={cx('item')}>
                                <div className={cx('wrapper-course')}>
                                    <div className={cx('courseItem')}>
                                        <Link
                                            to={`/courses/${item.slug}`}
                                            className={cx('box-img')}
                                        >
                                            <img
                                                className={cx('courseItem-img')}
                                                src={
                                                    item.image || images.noImage
                                                }
                                                alt="course"
                                            />
                                        </Link>
                                    </div>
                                    <div className={cx('content')}>
                                        <h3>
                                            <Link
                                                to={`/courses/${item.slug}`}
                                                className={cx('link-course')}
                                            >
                                                <p
                                                    className={cx(
                                                        'name-courser',
                                                    )}
                                                >
                                                    {item.courseName}
                                                </p>
                                            </Link>
                                        </h3>
                                        <p className={cx('type')}>
                                            {typeCourse}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
