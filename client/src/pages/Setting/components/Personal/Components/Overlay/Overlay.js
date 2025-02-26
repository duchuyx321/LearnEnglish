import classNames from 'classnames/bind';
import { IoIosCloseCircleOutline, IoIosAdd } from 'react-icons/io';
import { useState } from 'react';

import styles from './Overlay.module.scss';
import Button from '~/components/Button';
import { updateProfile } from '~/service/ProfileService';
import Image from '~/components/Image';
import images from '~/assets';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function Overlay({
    data = {},
    handleOnClose = DefaultFN,
    handleRerender = DefaultFN,
}) {
    const [value, setValue] = useState(data?.content || '');
    const [valueAvatar, setValueAvatar] = useState(data?.content || '');
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
        handleRerender();
        handleOnClose();
    };
    const handleOnUpload = (file) => {
        setValue(file);
        const previewUrl = URL.createObjectURL(file);
        setValueAvatar(previewUrl);
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
                    {data?.key === 'image' ? (
                        <div className={cx('inner_img')}>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                hidden
                                onInput={(e) =>
                                    handleOnUpload(e.target.files[0])
                                }
                            />
                            <label htmlFor="avatar">
                                <Image
                                    src={valueAvatar || images.noImage}
                                    alt={data?.title}
                                />
                            </label>
                            <label
                                className={cx('action_upload')}
                                htmlFor="avatar"
                            >
                                <span>
                                    <IoIosAdd />
                                </span>
                                <p>Tải ảnh lên</p>
                            </label>
                        </div>
                    ) : (
                        <div>
                            <p>{data?.title}</p>
                            {data?.key === 'bio' ? (
                                <textarea
                                    value={value}
                                    placeholder={data?.placeholder}
                                    onInput={(e) => setValue(e.target.value)}
                                    spellCheck="false"
                                    maxLength="150"
                                ></textarea>
                            ) : (
                                <input
                                    value={value}
                                    type="text"
                                    placeholder={data?.placeholder}
                                    onInput={(e) => setValue(e.target.value)}
                                />
                            )}
                        </div>
                    )}
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
