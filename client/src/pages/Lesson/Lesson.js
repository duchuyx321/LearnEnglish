import classNames from 'classnames/bind';

import styles from './Lesson.module.scss';

const cx = classNames.bind(styles);

function Lesson() {
    return <div className={cx('wrapper')}>Lesson Page</div>;
}

export default Lesson;
