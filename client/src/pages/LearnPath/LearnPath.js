import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './LearnPath.module.scss';
import { combinedPath } from '~/service/LearnPath';
import Piece from './components/Piece';

const cx = classNames.bind(styles);
const headerDescription =
    'Để bắt đầu một cách thuận lợi, bạn nên tập trung vào lộ trình học.Mỗi lộ trình được thiết kế để giúp bạn phát triển kỹ năng tiếng Anh từ cơ bản đến nâng cao, theo từng bước một. Hãy chọn lộ trình phù hợp với mục tiêu học tập của bạn và bắt đầu hành trình chinh phục tiếng Anh ngay hôm nay!';
function LearnPath() {
    const [resultPath, setResultPath] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await combinedPath();
            if (result) {
                setResultPath(result);
            }
        };
        fetchAPI();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h3>Lộ Trình Học</h3>
                <p>{headerDescription}</p>
            </header>
            <div className={cx('body')}>
                {resultPath.map((item) => (
                    <Piece key={item.other._id} data={item} />
                ))}
            </div>
        </div>
    );
}

export default LearnPath;
