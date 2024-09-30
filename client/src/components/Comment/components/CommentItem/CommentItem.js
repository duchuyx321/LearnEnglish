import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import styles from './CommentItem.module.scss';
import Image from '~/components/Image';
import Reactions from '~/components/Reactions';
import { IconLike } from '~/components/Icon';
import Input from '../Input';
import { formatTime } from '~/service/formatTime';

const cx = classNames.bind(styles);

function CommentItem({ data = {} }) {
    console.log(data);
    const [icon, setIcon] = useState('Thích');
    const [isReply, setIsReply] = useState(false);

    const handleOnIcon = (icon) => {
        setIcon(icon);
    };
    const handleOnClick = () => {
        if (icon === 'Thích') {
            setIcon(<IconLike width="3.2rem" height="3.2rem" />);
        } else {
            setIcon('Thích');
        }
    };
    const handleIsReply = () => {
        setIsReply(!isReply);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={`/@${data?.username}`} className={cx('user')}>
                    <Image
                        src={data?.profile?.avatar}
                        alt={
                            `${data?.profile?.first_name} ${data?.profile?.last_name}` ||
                            'avatar'
                        }
                        className={cx('avatar')}
                    />
                    <div className={cx('info')}>
                        <span className={cx('username')}>
                            {`${data?.profile?.first_name} ${data?.profile?.last_name}`}
                        </span>
                        <span className={cx('createAt')}>
                            {formatTime(data.createdAt) || ''}
                        </span>
                    </div>
                </Link>
            </div>
            <div className={cx('body')}>
                <p>{data.commentContent || ' '}</p>
            </div>
            <div className={cx('footer')}>
                <div className={cx('reactionBar')}>
                    <div className={cx('left')}>
                        <Tippy
                            interactive={true}
                            appendTo="parent"
                            delay={[500]}
                            placement="top-start"
                            render={(attrs) => (
                                <div
                                    className={cx('Reactions')}
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    <Reactions handleOnClick={handleOnIcon} />
                                </div>
                            )}
                        >
                            <span>
                                <button
                                    className={cx('interaction')}
                                    onClick={() => handleOnClick()}
                                >
                                    {icon || 'Thích'}
                                </button>
                            </span>
                        </Tippy>
                        <button
                            className={cx('interaction')}
                            onClick={() => handleIsReply()}
                        >
                            Phản Hồi
                        </button>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('reactionBtn')}></div>
                    </div>
                </div>
                {isReply && (
                    <div className={cx('comment')}>
                        <Input handleOnClose={handleIsReply} model />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
