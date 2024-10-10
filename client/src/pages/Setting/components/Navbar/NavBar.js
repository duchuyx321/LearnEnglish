import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';

import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

const LIST_NAVBAR = [
    {
        key: 'personal',
        content: 'Thông tin cá nhân',
        icon: <FaUser />,
    },
    {
        key: 'security',
        content: 'Mật khẩu và bảo mật',
        icon: <FaShield />,
    },
];

function NavBar() {
    return (
        <div className={cx('wrapper')}>
            {LIST_NAVBAR.map((item) => (
                <NavLink key={item.key} className={cx('link')}>
                    <div className={cx('icon')}>{item.icon}</div>
                    <div className={cx('linkInner')}>{item.content}</div>
                </NavLink>
            ))}
        </div>
    );
}

export default NavBar;
