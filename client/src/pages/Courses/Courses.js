import classNames from 'classnames/bind';

import styles from './Course.module.scss';

const cx = classNames.bind(styles);

function Courses() {
    return <div className={cx('wrapper')}>Courses Page</div>;
}

export default Courses;
