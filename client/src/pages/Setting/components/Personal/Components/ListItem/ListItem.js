import classNames from 'classnames/bind';

import styles from './ListItem.module.scss';
import Item from '../Item';

const cx = classNames.bind(styles);

function ListItem({ ListItem = [], title = {} }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h3>{title.title}</h3>
                <p>{title.content}</p>
            </div>
            <div className={cx('content')}>
                {ListItem.map((item) => (
                    <Item key={item.key} data={item} />
                ))}
            </div>
        </div>
    );
}

export default ListItem;
