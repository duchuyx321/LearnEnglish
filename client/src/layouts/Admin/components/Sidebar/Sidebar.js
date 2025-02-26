import classNames from 'classnames/bind';
import {
    MdOutlineManageAccounts,
    MdOutlineSettings,
    MdOutlineCollectionsBookmark,
    MdOutlineSpeed,
} from 'react-icons/md';
import { LuTag } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';
import Image from '~/components/Image';
import images from '~/assets';
import { Profile_ME } from '~/service/ProfileService';

const cx = classNames.bind(styles);

const LIST_SIDEBAR = [
    {
        icon: <MdOutlineSpeed />,
        name: 'Bảng điều khiển',
        to: '/admin',
    },
    {
        icon: <MdOutlineManageAccounts />,
        name: 'Quản lý người dùng',
        to: '/admin/users',
    },
    {
        icon: <LuTag />,
        name: 'Quản lý khóa học',
        to: '/admin/courses',
    },
    {
        icon: <MdOutlineCollectionsBookmark />,
        name: 'Quản lý bài học',
        to: '/admin/lessons',
    },
    {
        icon: <MdOutlineSettings />,
        name: 'Cài đặt hệ thống',
        to: '/admin/setting',
    },
];

function SideBar() {
    const [result, setResult] = useState({});
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await Profile_ME();
            setResult(result.data);
        };
        fetchAPI();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <Image src={result.avatar || images.noImage} alt="avatar" />
                </div>
                <div className={cx('profile')}>
                    <h3>{`${result.first_name}${result.last_name}`}</h3>
                    <p>Chào mừng trở lại</p>
                </div>
            </div>
            <div className={cx('body')}>
                {LIST_SIDEBAR.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        end
                        className={(nav) => {
                            return cx('itemBtn', {
                                active: nav.isActive,
                            });
                        }}
                    >
                        <span className={cx('itemBtn-icon')}>{item.icon}</span>
                        <span className={cx('itemBtn-title')}>{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default SideBar;
