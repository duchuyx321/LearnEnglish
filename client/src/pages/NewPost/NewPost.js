import classNames from 'classnames/bind';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import styles from './NewPost.module.scss';
import Image from '~/components/Image';
import Status from './components/Status';
import Button from '~/components/Button';
import { createBlog } from '~/service/BlogService';
import { Profile_ME } from '~/service/ProfileService';

const cx = classNames.bind(styles);

function NewPost() {
    const [dataProfile, setDataProfile] = useState({});
    const [isPublic, setIsPublic] = useState(true);
    const [is_loading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [file, setFile] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const contentRef = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            fetchAPIProfile();
        }
    }, [token]);
    // call api
    const fetchAPIProfile = async () => {
        const result = await Profile_ME();
        setDataProfile(result.data);
    };
    // handle function
    const handleOnStatus = () => {
        setIsPublic(!isPublic);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
    };
    const handleOnInput = (e) => {
        setValue(e);
    };
    const handleOnShowEmoji = () => {
        setShowPicker(!showPicker);
    };
    const handleOnSelect = (e) => {
        const { current } = contentRef;
        if (contentRef?.current) {
            // Lấy nội dung hiện tại của contentEditable div
            const content = current.innerHTML;

            // Cập nhật nội dung với emoji mới
            setValue(content + e.native);

            // Cập nhật nội dung của contentEditable div
            current.innerHTML = content + e.native;
        }
    };
    const handleOnOpen = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    };
    const handleOnImportFile = (e) => {
        const files = e.target.files[0];
        setFile(files);
        const imageURL = URL.createObjectURL(files); // Tạo URL tạm thời cho ảnh
        setPreviewImage(imageURL); // Cập nhật URL vào state
    };
    const handleOnClearImg = () => {
        setPreviewImage(null);
    };
    const handleOnPost = async () => {
        setIsLoading(true);
        if (value && token) {
            const result = await createBlog({
                content: value,
                image: file,
                is_public: isPublic,
            });
            if (result.message === 'Created successfully') {
                navigate('/blog?page=1');
            }
            setIsLoading(false);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h3>Tạo Bài Viết </h3>
                </div>
                <form
                    className={cx('post')}
                    onSubmit={(e) => handleOnSubmit(e)}
                >
                    <div className={cx('header')}>
                        <div className={cx('avatar')}>
                            <Image
                                src={dataProfile?.avatar}
                                alt={`ảnh đại diện ${dataProfile?.first_name} ${dataProfile?.last_name}`}
                            />
                        </div>
                        <div className={cx('profile')}>
                            <h3>{`${dataProfile?.first_name} ${dataProfile?.last_name}`}</h3>
                            <Status
                                isPublic={isPublic}
                                handleOnClick={handleOnStatus}
                            />
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('write')}>
                            <div
                                ref={contentRef}
                                className={cx('content')}
                                contentEditable
                                data-placeholder="Bạn Đang Nghĩ Gì Vậy?"
                                onInput={(e) =>
                                    handleOnInput(e.target.innerText)
                                }
                            ></div>
                            <div className={cx('emoji')}>
                                <button
                                    className={cx('btn-Emoji')}
                                    onClick={() => handleOnShowEmoji()}
                                >
                                    <BsEmojiHeartEyes />
                                </button>
                                {showPicker && (
                                    <Picker
                                        data={data}
                                        onEmojiSelect={(e) => handleOnSelect(e)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={cx('import')}>
                            <div className={cx('wrapper-import')}>
                                {previewImage ? (
                                    <div>
                                        <img
                                            src={previewImage}
                                            alt="file import"
                                        />
                                        <button
                                            onClick={() => handleOnClearImg()}
                                        >
                                            <IoCloseCircleOutline />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className={cx('take')}
                                        onClick={() => handleOnOpen()}
                                    >
                                        <MdAddPhotoAlternate />
                                        <p>Thêm ảnh</p>
                                    </button>
                                )}
                            </div>

                            <input
                                ref={inputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => handleOnImportFile(e)}
                            />
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <Button
                            outline
                            large
                            disabled={value === '' ? true : false}
                            onClick={() => handleOnPost()}
                        >
                            Đăng
                        </Button>
                        <span className={cx({ rotate: is_loading })}>
                            <AiOutlineLoading3Quarters />
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPost;
