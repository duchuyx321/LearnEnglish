import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import { combined } from '~/service/CourseService';
import { checkCourseRegistration } from '~/service/progressService';
import images from '~/assets';

const cx = classNames.bind(styles);

function Home() {
    const [courseRender, setCourseRender] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await combined();
            setCourseRender(result);
        };
        fetchAPI();
    }, []);
    const handleOnCheckRegistered = async (courseID, course_slug) => {
        const result = await checkCourseRegistration(
            'course',
            courseID,
            course_slug,
        );
        console.log(result);
        if (result.message === 'Course not registered') {
            return navigate(`/courses/${course_slug}`);
        } else if (result.message === 'Course registered') {
            return navigate(`/lesson/${result.lessonID}`);
        }
    };
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
                                        <button
                                            className={cx('box-img')}
                                            onClick={() =>
                                                handleOnCheckRegistered(
                                                    item._id,
                                                    item.slug,
                                                )
                                            }
                                        >
                                            <img
                                                className={cx('courseItem-img')}
                                                src={
                                                    item.image || images.noImage
                                                }
                                                alt="course"
                                            />
                                        </button>
                                    </div>
                                    <div className={cx('content')}>
                                        <h3>
                                            <button
                                                className={cx('link-course')}
                                                onClick={() =>
                                                    handleOnCheckRegistered(
                                                        item._id,
                                                        item.slug,
                                                    )
                                                }
                                            >
                                                <p
                                                    className={cx(
                                                        'name-courser',
                                                    )}
                                                >
                                                    {item.courseName}
                                                </p>
                                            </button>
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
