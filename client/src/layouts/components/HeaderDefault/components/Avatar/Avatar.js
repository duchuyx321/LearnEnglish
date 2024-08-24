import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Avatar.module.scss';
import MenuPopper from '~/components/PopperWrapper/MenuPopper';
import Image from '~/components/Image';
import images from '~/assets';
import { Link } from 'react-router-dom';
import MenuItem from '~/components/PopperWrapper/MenuItem';

const cx = classNames.bind(styles);

function Avatar({ children, userResult = {} }) {
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive={true}
                appendTo="parent"
                placement="bottom-end"
                duration={[200]}
                delay={[50]}
                offset={[0, 10]} // Điều chỉnh khoảng cách ngang và dọc
                trigger="click" // Chỉ hiện khi click
                render={(attrs) => (
                    <div className={cx('Menu-list')} tabIndex="-1" {...attrs}>
                        <MenuPopper>
                            <div className={cx('user')}>
                                <div className={cx('user-inner')}>
                                    <Image
                                        className={cx('avatar-img')}
                                        src={
                                            userResult?.profile?.avatar ||
                                            images.noImage
                                        }
                                        alt="avatar"
                                    />
                                </div>
                                <Link
                                    to={`@${userResult?.user?.username}`}
                                    className={cx('use-description')}
                                >
                                    <h3 className={cx('name')}>
                                        {`${userResult?.profile?.first_name} ${userResult?.profile?.last_name}`}
                                    </h3>
                                    <span className={cx('username')}>
                                        {`@${userResult?.user?.username}`}
                                    </span>
                                </Link>
                            </div>
                            <MenuItem username={userResult?.user?.username} />
                        </MenuPopper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Avatar;
