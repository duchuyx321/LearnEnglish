import classNames from 'classnames/bind';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';

import styles from './Overlay.module.scss';
import Button from '~/components/Button';
import { updateProfile } from '~/service/ProfileService';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function Overlay({ data = {}, handleOnClose = DefaultFN }) {
    const [value, setValue] = useState(data?.content || '');
    // handle
    const handleOnSave = () => {
        if (value.length === 0 || value === data?.content) {
            return;
        }
        if (data.key === 'name') {
            const [first_name, last_name] = value.slipt(' ', 2);
            fetchAPIUpdate({ first_name, last_name });
        } else if (data.key === 'bio') {
            fetchAPIUpdate({ bio: value });
        } else if (data.key === 'image') {
            fetchAPIUpdate({ avatar: value });
        } else if (data.key === 'fb') {
            fetchAPIUpdate({ facebook_url: value });
        } else if (data.key === 'ig') {
            fetchAPIUpdate({ instagram_url: value });
        } else if (data.key === 'tiktok') {
            fetchAPIUpdate({ tiktok_url: value });
        }
    };
    // fetch api
    const fetchAPIUpdate = async ({
        first_name,
        last_name,
        avatar,
        bio,
        facebook_url,
        instagram_url,
        tiktok_url,
    }) => {
        const result = await updateProfile({
            first_name,
            last_name,
            avatar,
            bio,
            facebook_url,
            instagram_url,
            tiktok_url,
        });
        console.log(result);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button
                    className={cx('btn-close')}
                    onClick={() => handleOnClose()}
                >
                    <IoIosCloseCircleOutline />
                </button>
                <div className={cx('header')}>
                    <h3>{data?.titleOverlay}</h3>
                    <p>{data?.contentOverlay}</p>
                </div>
                <div className={cx('body')}>
                    <p>{data?.title}</p>
                    <input
                        value={value}
                        type="text"
                        placeholder={data?.placeholder}
                        onInput={(e) => setValue(e.target.value)}
                    />
                </div>
                <div className={cx('action')}>
                    <Button
                        primary
                        large
                        onClick={() => handleOnSave()}
                        disabled={value.length === 0 || value === data?.content}
                    >
                        Lưu Lại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Overlay;
