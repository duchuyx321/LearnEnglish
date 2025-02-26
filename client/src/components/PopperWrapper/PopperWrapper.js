import classNames from 'classnames/bind';

import styles from './PopperWrapper.module.scss';

const cx = classNames.bind(styles);
function PopperWrapper({ children, className, title }) {
    return (
        <div className={cx('wrapper', className)}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default PopperWrapper;
