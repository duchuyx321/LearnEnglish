import classNames from 'classnames/bind';

import styles from './Body.module.scss';
import CommentItem from '../CommentItem';

const cx = classNames.bind(styles);

function Body() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div>
                    <span>20</span>
                    Bình Luận
                </div>
                <div>
                    Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
                </div>
            </div>
            <div className={cx('body')}>
                <CommentItem />
            </div>
        </div>
    );
}

export default Body;
