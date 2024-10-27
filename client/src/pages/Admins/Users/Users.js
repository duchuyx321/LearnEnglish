import classNames from 'classnames/bind';

import styles from './Users.module.scss';

const cx = classNames.bind(styles);

function Users() {
    return <div className={cx('wrapper')}> Users PAGE</div>;
}

export default Users;
