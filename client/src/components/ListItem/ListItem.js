import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './ListItem.module.scss';
import { checkCourseRegistration } from '~/service/progressService';
import images from '~/assets';

const cx = classNames.bind(styles);

function ListItem({ data }) {
    const navigate = useNavigate();
    const handleOnCheckRegistered = async (courseID, course_slug) => {
        const result = await checkCourseRegistration(
            'course',
            courseID,
            course_slug,
        );
        if (result.message === 'Course not registered') {
            return navigate(`/courses/${course_slug}`);
        } else if (result.message === 'Course registered') {
            return navigate(`/learning/${course_slug}?id=${result.lessonID}`);
        }
    };
    const typeCourse = 'Miễn Phí';
    return (
        <div className={cx('wrapper')}>
            <div className={cx('courses')}>
                {data.map((item) => (
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
                                        src={item.image || images.noImage}
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
                                        <p className={cx('name-courser')}>
                                            {item.courseName}
                                        </p>
                                    </button>
                                </h3>
                                <p className={cx('type')}>{typeCourse}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListItem;
