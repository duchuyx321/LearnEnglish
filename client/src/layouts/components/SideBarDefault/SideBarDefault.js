import classNames from 'classnames/bind';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBarDefault() {
    return <div className={cx('wrapper')}>SideBarDefault</div>;
}

export default SideBarDefault;
