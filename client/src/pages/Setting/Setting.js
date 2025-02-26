import classNames from 'classnames/bind';

import styles from './Setting.module.scss';
import Sidebar from './components/Sidebar';

const cx = classNames.bind(styles);

function Setting({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Sidebar />
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default Setting;
