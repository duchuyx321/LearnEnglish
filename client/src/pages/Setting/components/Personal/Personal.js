import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Personal.module.scss';
import ListItem from '~/pages/Setting/components/ListItem';
import { Profile_ME } from '~/service/ProfileService';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const cx = classNames.bind(styles);

// LIST
const LIST_INFO = {
    title: {
        title: 'Thông tin cá nhân',
        content: 'Quản lý tên,bio,avatar của bạn.',
    },
    content: [
        {
            key: 'name',
            title: 'Họ và tên',
            content: '',
            titleOverlay: 'Cập nhật tên của bạn',
            placeholder: 'Nhập họ tên bạn',
            contentOverlay:
                'Tên của bạn sẽ được hiển thị trên trang cá nhân và bài viết của bạn.',
        },
        {
            key: 'bio',
            title: 'Giới thiệu',
            content: '',
            titleOverlay: 'Chỉnh sửa phần giới thiệu',
            placeholder: 'Giới thiệu về bản thân',
            contentOverlay:
                'Phần giới thiệu (tiểu sử) được hiển thị tại trang cá nhân của bạn, giúp mọi người hiểu rõ hơn về bạn.',
        },
        {
            key: 'image',
            title: 'Ảnh đại diện',
            content: '',
            titleOverlay: 'Ảnh đại diện',
            contentOverlay:
                'Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...',
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
            titleOverlay: 'Trang cá nhân Facebook',
            contentOverlay:
                'Địa chỉ Facebook sẽ hiển thị trên trang cá nhân của bạn.',
            placeholder: 'Nhập URL Facebook của bạn',
        },
        {
            key: 'ig',
            title: 'Intagram',
            content: '',
            titleOverlay: 'Trang cá nhân Intagram',
            contentOverlay:
                'Địa chỉ Intagram sẽ hiển thị trên trang cá nhân của bạn.',
            placeholder: 'Nhập URL Intagram của bạn',
        },
        {
            key: 'tiktok',
            title: 'Tiktok',
            content: '',
            titleOverlay: 'Trang cá nhân TikTok',
            contentOverlay:
                'Địa chỉ TikTok sẽ hiển thị trên trang cá nhân của bạn.',
            placeholder: 'Nhập URL TikTok của bạn',
        },
    ],
};

function Personal() {
    const [listInfo, setListInfo] = useState(LIST_INFO);
    const [listSocial, setListSocial] = useState(LIST_SOCIAL);
    const [isRerender, setIsRerender] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchAPI();
    }, [isRerender]);
    // fetch api
    const fetchAPI = async () => {
        const result = await Profile_ME();

        setListInfo((prevState) => ({
            ...prevState,
            content: prevState.content.map((item) => {
                if (item.key === 'name') {
                    return {
                        ...item,
                        content: `${result?.data?.first_name}${result?.data?.last_name}`,
                    };
                } else if (item.key === 'bio') {
                    return { ...item, content: result?.data?.bio };
                } else if (item.key === 'image') {
                    return { ...item, content: result?.data?.avatar };
                }
                return item;
            }),
        }));
        setListSocial((prevState) => ({
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
    const handleOnRerender = () => {
        setIsRerender(!isRerender);
    };
    const handleOnClose = () => {
        navigate(-1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <button
                    className={cx('btn-close')}
                    onClick={() => handleOnClose()}
                >
                    <IoIosCloseCircleOutline />
                </button>
                <div className={cx('title')}>
                    <h3>Thông tin cá nhân</h3>
                    <p>Quản lý thông tin cá nhân của bạn.</p>
                </div>
            </div>
            <div className={cx('inner')}>
                <ListItem
                    ListItem={listInfo.content}
                    title={listInfo.title}
                    handle={handleOnRerender}
                    type="Personal"
                />
            </div>
            <div className={cx('inner')}>
                <ListItem
                    ListItem={listSocial.content}
                    title={listSocial.title}
                    handle={handleOnRerender}
                    type="Personal"
                />
            </div>
        </div>
    );
}

export default Personal;
