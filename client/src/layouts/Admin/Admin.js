import classNames from 'classnames/bind';

import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

function Admin({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Admin;
