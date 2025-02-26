import classNames from 'classnames/bind';

import styles from './Courses.module.scss';

const cx = classNames.bind(styles);

function Courses() {
    return <div className={cx('wrapper')}> Courses PAGE</div>;
}

export default Courses;
