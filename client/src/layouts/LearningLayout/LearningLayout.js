import classNames from 'classnames/bind';

import styles from './LearningLayout.module.scss';
import HeaderLearning from '~/layouts/LearningLayout/components/HeaderLearning';
import ContentCourse from '~/layouts/LearningLayout/components/ContentCourse';

const cx = classNames.bind(styles);

function LearningLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderLearning />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('inner')}>{children}</div>
                </div>
                <div className={cx('sidebar')}>
                    <ContentCourse />
                </div>
            </div>
        </div>
    );
}

export default LearningLayout;
