import classNames from 'classnames/bind';

import styles from './MenuItem.module.scss';
import Button from '~/components/Button';
import { logout } from '~/service/AuthService';

const cx = classNames.bind(styles);

function MenuItem({ username }) {
    const MENU_ITEM = {
        page: [
            {
                title: 'Trang Cá Nhân',
                to: `/@${username}`,
            },
        ],
        blog: [
            { title: 'Viết Blog', to: `/new-post` },
            { title: 'Bài Viết Của Tôi', to: '/me-posts' },
            { title: 'Bài Viết Đã Lưu', to: '/me-bookmark' },
        ],
        setting: [
            { title: 'Cài Đặt', to: '/setting/personal' },
            { title: 'Đăng Xuất' },
        ],
    };
    const handleOnclick = (e) => {
        if (e === 'Đăng Xuất') {
            fetchAPILogin();
        }
    };
    // fetch  api
    const fetchAPILogin = async () => {
        const result = await logout();
        console.log(result.data);
        if (result.data.message === 'logout successful') {
            localStorage.removeItem('token');
            window.location.reload();
        }
    };
    return (
        <div className={cx('wrapper')}>
            {Object.keys(MENU_ITEM).map((key, index) => (
                <ul key={index} className={cx('list')}>
                    {MENU_ITEM[key].map((item, i) => (
                        <li key={i} className={cx('item')}>
                            <Button
                                className={cx('item-btn')}
                                to={item.to}
                                onClick={(e) =>
                                    handleOnclick(e.target.innerText)
                                }
                            >
                                {item.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}

export default MenuItem;
