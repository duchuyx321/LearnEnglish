import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import images from '~/assets';
import NavBar from '../Navbar';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Link to="/" className={cx('logo')}>
                <img src={images.logo} alt="logo LearnEnglish" />
            </Link>
            <div className={cx('title_sidebar')}>
                <h3>Cài đặt tài khoản</h3>
                <p>
                    quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài
                    đặt bảo mật, quản lý thông báo, v.v.v.
                </p>
            </div>
            <div className={cx('navbar')}>
                <NavBar />
            </div>
        </div>
    );
}

export default Sidebar;
