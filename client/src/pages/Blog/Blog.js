import classNames from 'classnames/bind';

import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
    return <div className={cx('wrapper')}>Blog Page</div>;
}

export default Blog;
