import classNames from 'classnames/bind';
import { FaCaretDown } from 'react-icons/fa6';
import Tippy from '@tippyjs/react/headless';

import styles from './Status.module.scss';

const cx = classNames.bind(styles);
const defaultFN = () => {};

function Status({ isPublic = true, handleOnClick = defaultFN }) {
    return (
        <Tippy
            interactive={true}
            appendTo="parent"
            placement="bottom-start"
            duration={[200]}
            delay={[50]}
            offset={[0, -3]} // Điều chỉnh khoảng cách ngang và dọc
            trigger="click" // Chỉ hiện khi click
            render={(attrs) => (
                <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                    <button
                        className={cx('btn-status')}
                        onClick={() => handleOnClick()}
                    >
                        {isPublic ? 'Private' : 'Public'}
                    </button>
                </div>
            )}
        >
            <div className={cx('status')}>
                {isPublic ? 'Public' : 'Private'}
                <div className={cx('care')}>
                    <FaCaretDown />
                </div>
            </div>
        </Tippy>
    );
}

export default Status;
