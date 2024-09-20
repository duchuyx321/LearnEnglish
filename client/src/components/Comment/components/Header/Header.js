import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import styles from './Header.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Header() {
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const inputRef = useRef(null);
    const MAX_CHARACTERS = 119;
    // handle
    const handleOnSelect = (e) => {
        const { current } = inputRef;
        if (current) {
            const content = current.innerHTML;
            // Cập nhật nội dung với emoji mới
            if (content.length < MAX_CHARACTERS) {
                setValue(value + e.native);
                current.innerHTML = content + e.native;
            }
        }
    };
    const handleOnInput = (e) => {
        const target = e.target;
        const text = target.innerText;

        if (
            text.length >= MAX_CHARACTERS &&
            e.inputType !== 'deleteContentBackward'
        ) {
            target.innerText = text.slice(0, MAX_CHARACTERS);

            // Đặt con trỏ ở cuối văn bản sau khi cắt
            const range = document.createRange();
            const sel = window.getSelection();

            // Kiểm tra nếu target có childNodes
            if (target.childNodes.length > 0) {
                const lastChild =
                    target.childNodes[target.childNodes.length - 1];
                const length = lastChild.textContent.length;
                range.setStart(lastChild, length);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
        setValue(text);
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('exit')}>
                <IoClose />
            </button>
            <div className={cx('post')}>
                <div className={cx('user')}>
                    <Image src="" alt="" />
                </div>
                <div className={cx('comment')}>
                    <div className={cx('total')}>
                        <span>{value.length || 0}</span>
                        <p>/120</p>
                    </div>
                    <div
                        value={value}
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
    );
}

export default Header;
