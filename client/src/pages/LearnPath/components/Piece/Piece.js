import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Piece.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { checkCourseRegistration } from '~/service/progressService';

const cx = classNames.bind(styles);
function Piece({ data = {} }) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    // handle function
    const handleOnLearnNow = async (courseID, course_slug) => {
        if (!token) {
            return navigate(`/courses/${course_slug}`);
        } else {
            const result = await checkCourseRegistration(courseID, course_slug);
            if (result.message === 'Course not registered') {
                return navigate(`/courses/${course_slug}`);
            } else if (result.message === 'Course registered') {
                return navigate(
                    `/learning/${course_slug}?id=${result.lessonID}`,
                );
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h3>{data.other.namePath}</h3>
                    <p>{data.other.descriptionPath}</p>
                </div>
                <div className={cx('thumb')}>
                    <Image src={data.other.image} alt="Image Learn Path" />
                </div>
            </div>
            <div className={cx('cta')}>
                {data?.courseList?.map((item) => (
                    <Tippy
                        key={item._id}
                        content={item.courseName}
                        delay={[1000, 500]}
                        placement="top"
                    >
                        <button
                            onClick={() =>
                                handleOnLearnNow(item._id, item.slug)
                            }
                            to={`/courses/${item.slug}`}
                            className={cx('element')}
                        >
                            <Image
                                src={item.image}
                                alt="Image Course"
                                className={cx('img-element')}
                            />
                        </button>
                    </Tippy>
                ))}
            </div>
            <div className={cx('start-now')}>
                <Button
                    primary
                    className={cx('btn-start')}
                    onClick={() =>
                        handleOnLearnNow(
                            data?.courseList[1]?._id,
                            data?.courseList[1]?.slug,
                        )
                    }
                >
                    Bắt Đầu Ngay !
                </Button>
            </div>
        </div>
    );
}

export default Piece;
