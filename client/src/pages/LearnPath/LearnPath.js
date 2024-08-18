import classNames from 'classnames/bind';

import styles from './LearnPath.module.scss';

const cx = classNames.bind(styles);

function LearnPath() {
    return <div className={cx('wrapper')}>Learn-Paths Page</div>;
}

export default LearnPath;
