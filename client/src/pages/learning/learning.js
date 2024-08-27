import classNames from 'classnames/bind';

import styles from './learning.module.scss';

const cx = classNames.bind(styles);

function Learning() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Learning;
