import classNames from 'classnames/bind';

import styles from './ListItem.module.scss';
import Item from '~/pages/Setting/components/Item';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function ListItem({ ListItem = [], title = {}, handle = DefaultFN }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h3>{title.title}</h3>
                <p>{title.content}</p>
            </div>
            <div className={cx('content')}>
                {ListItem.map((item) => (
                    <Item key={item.key} data={item} handleOnRefresh={handle} />
                ))}
            </div>
        </div>
    );
}

export default ListItem;
