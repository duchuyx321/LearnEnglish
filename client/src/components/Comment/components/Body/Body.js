/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { RiBracesLine } from 'react-icons/ri';

import styles from './Body.module.scss';
import CommentItem from '../CommentItem';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function Body({ data = {}, handleFetchAPI = DefaultFN, commentable_type }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div>
                    <span>{data.toastComment || '0'}</span>
                    Bình Luận
                </div>
                <div className={cx('waring')}>
                    Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
                </div>
            </div>
            {data.length === 0 ? (
                <div className={cx('hollow')}>
                    <div>
                        <RiBracesLine />
                    </div>
                    <p>Chưa có bình luận nào, hãy là người đầu tiên nào!</p>
                </div>
            ) : (
                <div className={cx('body')}>
                    {data.map((item) => (
                        <CommentItem
                            handleFetchAPI={handleFetchAPI}
                            key={item._id}
                            data={item}
                            commentable_type={commentable_type}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Body;
