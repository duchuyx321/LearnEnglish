import classNames from 'classnames/bind';
import { IoClose } from 'react-icons/io5';

import styles from './Header.module.scss';
import Image from '~/components/Image';
import Input from '../Input';

const cx = classNames.bind(styles);

const DefaultFN = () => {};

function Header({
    handleOnclose = DefaultFN,
    handleReset = DefaultFN,
    profile = {},
    commentable_type = '',
    commentable_id = '',
}) {
    return (
        <div className={cx('wrapper')}>
            <button className={cx('exit')} onClick={() => handleOnclose()}>
                <IoClose />
            </button>
            <div className={cx('post')}>
                <div className={cx('user')}>
                    <Image
                        src={profile?.avatar || ''}
                        alt={
                            `${profile?.first_name} ${profile?.last_name}` ||
                            'avatar'
                        }
                    />
                </div>
                <div className={cx('comment')}>
                    <Input
                        commentable_type={commentable_type}
                        commentable_id={commentable_id}
                        handleFetchAPI={handleReset}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
