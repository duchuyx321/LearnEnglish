import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import styles from './HeaderLearning.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function LearningLayout() {
    const params = useParams;
    useEffect(() => {}, []);
    // call api
    // const fetchApi

    return (
        <div className={cx('wrapper')}>
            <h1>Header components</h1>
        </div>
    );
}

export default LearningLayout;
