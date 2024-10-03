/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import styles from './CommentItem.module.scss';
import Image from '~/components/Image';
import Reactions from '~/components/Reactions';
import Input from '../Input';
import { formatTime } from '~/service/formatTime';
import {
    IconLike,
    IconLove,
    IconCrush,
    IconHaha,
    IconSad,
    IconAngry,
} from '~/components/Icon';
import { reactions } from '~/service/CommentService';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

const LIST_ICON = [
    {
        content: 'Like',
        iconReply: <IconLike width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Love',
        iconReply: <IconLove width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Crush',
        iconReply: <IconCrush width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Haha',
        iconReply: <IconHaha width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Sad',
        iconReply: <IconSad width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Angry',
        iconReply: <IconAngry width="3.2rem" height="3.2rem" />,
    },
];

function CommentItem({ data = {}, handleFetchAPI = DefaultFN }) {
    const [icon, setIcon] = useState('Thích');
    const [typeIcon, setTypeIcon] = useState(data.reaction || 'none');
    const [isReply, setIsReply] = useState(false);
    const [isReplies, setIsReplies] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            console.log('bạn cần đăng nhập');
        } else {
            if (typeIcon === 'none') {
                setIcon('Thích');
            } else {
                for (const i of LIST_ICON) {
                    if (i.content === typeIcon) {
                        setIcon(i.iconReply);
                        break;
                    }
                }
            }
            fetchReactAPI({ _id: data._id, type: typeIcon });
        }
    }, [typeIcon, data._id]);
    // fetch api
    const fetchReactAPI = async ({ _id, type }) => {
        const result = await reactions({ _id, type });
        console.log(result);
    };
    // handle event
    const handleOnIcon = (type) => {
        if (!token) {
            console.log('bạn cần đăng nhập');
            return;
        }
        setTypeIcon(type);
    };
    const handleOnClick = () => {
        if (!token) {
            console.log('bạn cần đăng nhập');
            return;
        }
        if (icon === 'Thích') {
            setTypeIcon('Like');
        } else {
            setTypeIcon('none');
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
                        <Input
                            handleFetchAPI={handleFetchAPI}
                            handleOnClose={handleIsReply}
                            model
                        />
                    </div>
                )}
                <button
                    className={cx('btn-reply')}
                    onClick={() => setIsReplies(!isReplies)}
                >
                    {isReplies
                        ? 'Thu Hồi'
                        : `Xem ${data.toastPath} câu trả lời`}
                </button>
                <div className={cx('replies')}></div>
            </div>
        </div>
    );
}

export default CommentItem;
