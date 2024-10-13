import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './Personal.module.scss';
import ListItem from './Components/ListItem';
import { Profile_ME } from '~/service/ProfileService';

const cx = classNames.bind(styles);

// LIST
const LIST_INFO = {
    title: {
        title: 'Thông tin cá nhân',
        content: 'Quản lý tên,bio,avatar của bạn.',
    },
    content: [
        {
            key: 'first_name',
            title: 'First name',
            content: '',
        },
        {
            key: 'last_name',
            title: 'Last name',
            content: '',
        },
        {
            key: 'bio',
            title: 'Giới thiệu',
            content: '',
        },
        {
            key: 'image',
            title: 'Ảnh dại diện',
            content: '',
        },
    ],
};
const LIST_SOCIAL = {
    title: {
        title: 'Thông tin mạng xã hội',
        content: 'liên kết tới các trang mạng xã hội của bạn.',
    },
    content: [
        {
            key: 'fb',
            title: 'Facebook',
            content: '',
        },
        {
            key: 'ig',
            title: 'Intagram',
            content: '',
        },
        {
            key: 'tiktok',
            title: 'Tiktok',
            content: '',
        },
    ],
};

function Personal() {
    const [listInfo, setListInfo] = useState(LIST_INFO);
    const [listSocial, setListSocial] = useState(LIST_SOCIAL);
    useEffect(() => {
        fetchAPI();
    }, []);
    // fetch api
    const fetchAPI = async () => {
        const result = await Profile_ME();
        console.log(result);
        setListInfo((prevState) => ({
            ...prevState,
            content: prevState.content.map((item) => {
                if (item.key === 'first_name') {
                    return { ...item, content: result?.data?.first_name };
                }
                if (item.key === 'last_name') {
                    return { ...item, content: result?.data?.last_name };
                }
                if (item.key === 'bio') {
                    return { ...item, content: result?.data?.bio };
                }
                if (item.key === 'image') {
                    return { ...item, content: result?.data?.avatar };
                }
                return item;
            }),
        }));
        setListInfo((prevState) => ({
            ...prevState,
            content: prevState.content.map((item) => {
                if (item.key === 'fb') {
                    return { ...item, content: result?.data?.facebook_url };
                } else if (item.key === 'ig') {
                    return { ...item, content: result?.data?.instagram_url };
                } else if (item.key === 'tiktok') {
                    return { ...item, content: result?.data?.tiktok_url };
                }
                return item;
            }),
        }));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3>Thông tin cá nhân</h3>
                <p>Quản lý thông tin cá nhân của bạn.</p>
            </div>
            <div className={cx('inner')}>
                <ListItem ListItem={listInfo.content} title={listInfo.title} />
            </div>
            <div className={cx('inner')}>
                <ListItem
                    ListItem={listSocial.content}
                    title={listSocial.title}
                />
            </div>
        </div>
    );
}

export default Personal;
