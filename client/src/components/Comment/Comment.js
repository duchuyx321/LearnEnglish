import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import styles from './Comment.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Comment({ commentId = '', type = 'blog' }) {
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const inputRef = useRef(null);

    // handle
    const handleOnSelect = (e) => {
        const { current } = inputRef;
        if (current) {
            const content = current.innerHTML;
            // Cập nhật nội dung với emoji mới
            setValue(value + e.native);
            current.innerHTML = content + e.native;
        }
    };
    const handleOnInput = (e) => {
        const target = e.target;
        const text = target.innerText;
        const MAX_CHARACTERS = 30;
        if (e.length > MAX_CHARACTERS) {
            target.innerText = text.substring(0, MAX_CHARACTERS);
        }
        setValue(e);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <button className={cx('exit')}>
                        <IoClose />
                    </button>
                </div>
                <div className={cx('body')}>
                    <div className={cx('post')}>
                        <div className={cx('user')}>
                            <Image src="" alt="" />
                        </div>
                        <div className={cx('comment')}>
                            <div className={cx('total')}>
                                <span>{value.length}</span>
                                <p>/30</p>
                            </div>
                            <div
                                className={cx('comment-input')}
                                contentEditable
                                data-placeholder="Nhập Bình Luận Của Bạn"
                                maxLength={10}
                                ref={inputRef}
                                onInput={(e) => handleOnInput(e)}
                            ></div>
                            <div className={cx('emoji')}>
                                <button
                                    className={cx('btn-emoji')}
                                    onClick={() => setShow(!show)}
                                >
                                    <BsEmojiHeartEyes />
                                </button>
                                {show && (
                                    <Picker
                                        data={data}
                                        onEmojiSelect={(e) => handleOnSelect(e)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}></div>
            </div>
        </div>
    );
}

export default Comment;
