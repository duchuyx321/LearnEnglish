import classNames from 'classnames/bind';
import { AiFillHome } from 'react-icons/ai';
import { FaRoad, FaNewspaper } from 'react-icons/fa6';

import styles from './SideBar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const LIST_SIDEBARS = [
    {
        name: 'Trang Chủ',
        icon: <AiFillHome />,
        to: '/',
    },
    {
        name: 'Lộ trình',
        icon: <FaRoad />,
        to: '/learning-paths',
    },
    {
        name: 'Bài Viết',
        icon: <FaNewspaper />,
        to: '/blog',
    },
];
function SideBarDefault() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {LIST_SIDEBARS.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        className={(nav) =>
                            cx('itemBtn', { active: nav.isActive })
                        }
                    >
                        <span className={cx('itemBtn-icon')}>{item.icon}</span>
                        <span className={cx('itemBtn-title')}>{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default SideBarDefault;
