import classNames from 'classnames/bind';
import { AiFillHome } from 'react-icons/ai';
import { FaRoad, FaNewspaper } from 'react-icons/fa6';

import styles from './SideBar.module.scss';
import { NavLink, useMatch } from 'react-router-dom';

const cx = classNames.bind(styles);

const LIST_SIDEBARS = [
    {
        title: 'Trang Chủ',
        icon: <AiFillHome />,
        to: '/',
    },
    {
        title: 'Lộ trình',
        icon: <FaRoad />,
        to: '/learning-paths',
    },
    {
        title: 'Bài Viết',
        icon: <FaNewspaper />,
        to: `/blog?page=1`,
    },
];
function SideBarDefault({ ListSidebar = LIST_SIDEBARS }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {ListSidebar.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        end
                        className={(nav) => {
                            console.log(nav);
                            return cx('itemBtn', {
                                active: nav.isActive,
                            });
                        }}
                    >
                        <span className={cx('itemBtn-icon')}>{item.icon}</span>
                        <span className={cx('itemBtn-title')}>
                            {item.title}
                        </span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default SideBarDefault;
