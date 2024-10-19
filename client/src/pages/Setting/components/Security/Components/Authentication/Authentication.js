import classNames from 'classnames/bind';
import { CiWarning } from 'react-icons/ci';

import styles from './Authentication.module.scss';

const cx = classNames.bind(styles);

function Authentication() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('warning')}>
                <div>
                    <CiWarning />
                </div>
                <p>Tính Năng chưa được phát triển </p>
            </div>
        </div>
    );
}

export default Authentication;
