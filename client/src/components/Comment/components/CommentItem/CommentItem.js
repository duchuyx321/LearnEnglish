import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import styles from './CommentItem.module.scss';
import Image from '~/components/Image';
import Reactions from '~/components/Reactions';

const cx = classNames.bind(styles);

function CommentItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link className={cx('user')}>
                    <Image src="" alt="" className={cx('avatar')} />
                    <div className={cx('info')}>
                        <span className={cx('username')}>Đức Huy</span>
                        <span className={cx('createAt')}>3 Tháng Trước</span>
                    </div>
                </Link>
            </div>
            <div className={cx('body')}>
                <p>Nội Dung Hay Chất Lượng Cao</p>
            </div>
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
                                <Reactions />
                            </div>
                        )}
                    >
                        <span>
                            <button className={cx('interaction')}>Thích</button>
                        </span>
                    </Tippy>
                    <button className={cx('interaction')}>Phản Hồi</button>
                </div>
                <div className={cx('right')}>
                    <div className={cx('reactionBtn')}></div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
