import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Course.module.scss';

const cx = classNames.bind(styles);

function Courses() {
    const course_slug = useParams();
    useEffect(() => {}, []);
    return <div className={cx('wrapper')}>Courses Page</div>;
}

export default Courses;
