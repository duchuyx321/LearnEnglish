import classNames from 'classnames/bind';

import styles from './Notication.module.scss';

const cx = classNames.bind(styles);

function Notification() {
    return <div className={cx('wrapper')}></div>;
}

export default Notification;
