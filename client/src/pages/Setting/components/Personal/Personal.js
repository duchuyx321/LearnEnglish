import classNames from 'classnames/bind';

import styles from './Personal.module.scss';

const cx = classNames.bind(styles);

function Personal() {
    return <div className={cx('wrapper')}>Personal page</div>;
}

export default Personal;
