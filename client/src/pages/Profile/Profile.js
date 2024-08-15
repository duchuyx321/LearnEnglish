import classNames from 'classnames/bind';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    return <div className={cx('wrapper')}>Profile Page</div>;
}

export default Profile;
