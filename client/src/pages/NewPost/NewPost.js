import classNames from 'classnames/bind';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Style cho Quill
import { useEffect, useRef, useState } from 'react';

import styles from './NewPost.module.scss';
import Image from '~/components/Image';
import Status from './components/Status';

const cx = classNames.bind(styles);

function NewPost() {
    const [isPublic, setIsPublic] = useState(true);

    const contentRef = useRef();
    useEffect(() => {
        if (contentRef.current) {
            new Quill();
        }
    }, []);
    // call api

    // handle function
    const handleOnStatus = () => {
        setIsPublic(!isPublic);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
    };
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
                        <div className={cx('content')}>
                            <div
                                placeholder="Bạn Đang Nghĩ Gì Thế?"
                                contentEditable
                            ></div>
                        </div>
                    </div>
                    <div className={cx('footer')}></div>
                </form>
            </div>
        </div>
    );
}

export default NewPost;
