import classNames from 'classnames/bind';

import styles from './Blog.module.scss';
import Articles from './components/Articles';

const cx = classNames.bind(styles);

const headerDescription =
    'Tổng hợp những bài viết chất lượng, chia sẻ kinh nghiệm tự học tiếng Anh,cùng các phương pháp và kỹ thuật học tập hiệu quả để giúp bạn cải thiện khả năng ngoại ngữ một cách nhanh chóng và tự tin.';

function Blog() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3>Bài Viết Nổi Bật</h3>
                <p>{headerDescription}</p>
            </div>
            <div className={cx('body')}>
                <Articles />
            </div>
        </div>
    );
}

export default Blog;
