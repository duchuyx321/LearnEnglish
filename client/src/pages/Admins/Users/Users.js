import classNames from 'classnames/bind';

import styles from './Users.module.scss';
import Table from '~/pages/Admins/Users/components/Table';

const cx = classNames.bind(styles);

function Users() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3> Quản lý người dùng </h3>
                <p>
                    Admin quản lý người dùng: Xem, chỉnh sửa, xoá tài khoản
                    người dùng trong hệ thống.
                </p>
            </div>
            <div className={cx('body')}>
                <Table />
            </div>
        </div>
    );
}

export default Users;
