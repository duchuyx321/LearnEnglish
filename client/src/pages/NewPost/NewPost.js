import classNames from 'classnames/bind';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import styles from './NewPost.module.scss';
import Image from '~/components/Image';
import Status from './components/Status';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewPost() {
    const [isPublic, setIsPublic] = useState(true);
    const [value, setValue] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const contentRef = useRef();
    const inputRef = useRef();
    console.log(value);
    // import
    // call api

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
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
        setPreviewImage(imageURL); // Cập nhật URL vào state
    };
    console.log(previewImage);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h3>Tạo Bài Viết </h3>
                    <button>
                        <IoCloseCircleOutline />
                    </button>
                </div>
                <form
                    className={cx('post')}
                    onSubmit={(e) => handleOnSubmit(e)}
                >
                    <div className={cx('header')}>
                        <div className={cx('avatar')}>
                            <Image src="" alt="" />
                        </div>
                        <div className={cx('profile')}>
                            <h3>Đức Huy</h3>
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
                                    <img src={previewImage} alt="file import" />
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
                        <Button outline large>
                            Đăng
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPost;
