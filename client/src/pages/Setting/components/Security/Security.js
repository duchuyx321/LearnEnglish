import classNames from 'classnames/bind';

import styles from './Security.module.scss';

const cx = classNames.bind(styles);

function Security() {
    return <div className={cx('wrapper')}>Security page</div>;
}

export default Security;
