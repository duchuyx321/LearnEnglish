import classNames from 'classnames/bind';

import styles from './LearnPath.module.scss';

const cx = classNames.bind(styles);
const headerDescription =
    'Để bắt đầu một cách thuận lợi, bạn nên tập trung vào lộ trình học.Mỗi lộ trình được thiết kế để giúp bạn phát triển kỹ năng tiếng Anh từ cơ bản đến nâng cao, theo từng bước một. Hãy chọn lộ trình phù hợp với mục tiêu học tập của bạn và bắt đầu hành trình chinh phục tiếng Anh ngay hôm nay!';
function LearnPath() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h3>Lộ Trình Học</h3>
                <p>{headerDescription}</p>
            </header>
        </div>
    );
}

export default LearnPath;
