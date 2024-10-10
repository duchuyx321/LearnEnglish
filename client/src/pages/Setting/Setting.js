import classNames from 'classnames/bind';

import styles from './Setting.module.scss';
import images from '~/assets';
import NavBar from '~/pages/Setting/components/Navbar';

const cx = classNames.bind(styles);

function Setting() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo LearnEnglish" />
                </div>
                <div className={cx('title_sidebar')}>
                    <h3>Cài đặt tài khoản</h3>
                    <p>
                        quản lý cài đặt tài khoản của bạn như thông tin cá nhân,
                        cài đặt bảo mật, quản lý thông báo, v.v.v.
                    </p>
                </div>
                <div className={cx('navbar')}>
                    <NavBar />
                </div>
            </div>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Setting;
