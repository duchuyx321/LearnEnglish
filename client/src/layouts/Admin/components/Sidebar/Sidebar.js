import classNames from 'classnames/bind';
import {
    MdOutlineManageAccounts,
    MdOutlineSettings,
    MdOutlineCollectionsBookmark,
    MdOutlineSpeed,
} from 'react-icons/md';
import { LuTag } from 'react-icons/lu';

import styles from './Sidebar.module.scss';
import Image from '~/components/Image';
import images from '~/assets';
import SideBarDefault from '~/layouts/components/SideBarDefault';

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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <Image src={images.noImage} alt="avatar" />
                </div>
            </div>
            <div className={cx('body')}>
                <SideBarDefault ListSidebar={LIST_SIDEBAR} />
            </div>
        </div>
    );
}

export default SideBar;
