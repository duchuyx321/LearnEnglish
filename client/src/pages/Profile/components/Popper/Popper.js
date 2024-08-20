import classNames from 'classnames/bind';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Popper({ title, className, children }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>
            <div className={cx('content', className)}>{children}</div>
        </div>
    );
}

export default Popper;
