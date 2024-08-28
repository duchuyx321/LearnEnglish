import classNames from 'classnames/bind';

import styles from './ContentCourse.module.scss';

const cx = classNames.bind(styles);

function LearningLayout() {
    return (
        <div className={cx('wrapper')}>
            <h1>content course components</h1>
        </div>
    );
}

export default LearningLayout;
