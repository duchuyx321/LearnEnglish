import classNames from 'classnames/bind';
import { FaBatteryFull } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import styles from './PopperItem.module.scss';
import images from '~/assets';
import Button from '~/components/Button';
import { createProgress } from '~/service/progressService';

const cx = classNames.bind(styles);
function PopperItem({ data = {} }) {
    const navigate = useNavigate();
    const typeCourse = 'Miễn Phí';
    // call api
    const fetchAPIProgress = async (courseID) => {
        const result = await createProgress(courseID);
        if (result.message === 'created Progress successfully') {
            navigate(`/learning/${data?.slug}?id=${data?.lessons[0]?._id}`);
        }
    };
    //  function handle
    const handleOnRegister = (courseID) => {
        fetchAPIProgress(courseID);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('courses')}>
                <button className={cx('box-img')}>
                    <img
                        className={cx('courseItem-img')}
                        src={data.image || images.noImage}
                        alt="course"
                    />
                </button>
                <div className={cx('content')}>
                    <p className={cx('type')}>Khóa Học {typeCourse}</p>
                    <div className={cx('name-course')}>
                        <p className={cx('course-title')}>Tên Khóa Học:</p>
                        <h3 className={cx('name')}>{data.courseName}</h3>
                    </div>
                    <div className={cx('name-course')}>
                        <p className={cx('course-title')}>Tổng số bài học:</p>
                        <h3 className={cx('name')}>
                            {data ? data?.lessons?.length : 0}
                        </h3>
                    </div>
                    <div className={cx('name-course')}>
                        <p className={cx('course-icon')}>
                            <FaBatteryFull />
                        </p>
                        <h3 className={cx('name')}>Học Mọi lúc, Mọi Nơi </h3>
                    </div>
                </div>
                <div className={cx('register')}>
                    <Button
                        className={cx('btn-register')}
                        large
                        outline
                        onClick={() => handleOnRegister(data._id)}
                    >
                        Đăng Kí Học Ngày
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PopperItem;
