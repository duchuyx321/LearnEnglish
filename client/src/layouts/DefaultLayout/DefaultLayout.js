import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import HeaderDefault from '~/layouts/components/HeaderDefault';
import SideBarDefault from '~/layouts/components/SideBarDefault';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderDefault />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <SideBarDefault />
                </div>
                <div className={cx('content')}>
                    <div className={cx('inner')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
