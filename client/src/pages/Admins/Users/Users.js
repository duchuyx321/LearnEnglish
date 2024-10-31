import classNames from 'classnames/bind';

import styles from './Users.module.scss';

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
                <table border="1">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Tên người dùng</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Access level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={cx('td-input')}>
                                <input type="checkbox" />
                            </td>
                            <td>1</td>
                            <td>Đức Huy</td>
                            <td>duchuyx321</td>
                            <td>duchuyx321@gmail.com</td>
                            <td>Admin</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
