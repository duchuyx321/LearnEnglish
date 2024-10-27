import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}> </div>
            <div className={cx('body')}> </div>
            <div className={cx('footer')}> </div>
        </div>
    );
}

export default SideBar;
