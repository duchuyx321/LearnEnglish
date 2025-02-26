import classNames from 'classnames/bind';

import styles from './MenuPopper.module.scss';

const cx = classNames.bind(styles);

function MenuPopper({
    className,
    title,
    large = false,
    extend = false,
    children,
}) {
    const classes = cx('wrapper', {
        [className]: className,
        large,
    });
    return (
        <div className={classes}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{title}</h3>
                {extend && <button className={cx('extend')}>Xem Tất Cả</button>}
            </div>
            <div className={cx('border')}>{children}</div>
        </div>
    );
}
export default MenuPopper;
