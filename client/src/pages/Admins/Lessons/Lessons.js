import classNames from 'classnames/bind';

import styles from './Lessons.module.scss';

const cx = classNames.bind(styles);

function Lessons() {
    return <div className={cx('wrapper')}> Lessons PAGE</div>;
}

export default Lessons;
