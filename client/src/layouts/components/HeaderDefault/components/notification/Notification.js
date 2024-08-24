import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Notication.module.scss';
import MenuPopper from '~/components/PopperWrapper/MenuPopper';

const cx = classNames.bind(styles);

function Notification({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive={true}
                appendTo="parent"
                placement="bottom-end"
                duration={[200]}
                delay={[50]}
                offset={[0, 5]} // Điều chỉnh khoảng cách ngang và dọc
                trigger="click" // Chỉ hiện khi click
                render={(attrs) => (
                    <div className={cx('Menu-list')} tabIndex="-1" {...attrs}>
                        <MenuPopper
                            large
                            title={'Thông Báo'}
                            // extend={!!userResult.progress}
                        >
                            <h4 className={cx('menu-list-alert')}>
                                Không có thông báo nào
                            </h4>
                        </MenuPopper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Notification;
