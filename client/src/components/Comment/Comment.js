import classNames from 'classnames/bind';

import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment({ commentId = '', type = 'blog' }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Comment;
