import classNames from 'classnames/bind';
import { useState } from 'react';
import { IoMdAdd, IoMdRemoveCircle } from 'react-icons/io';
import { AiTwotoneNotification } from 'react-icons/ai';

import styles from './ListLesson.module.scss';

const cx = classNames.bind(styles);
function ListLesson({ data = [] }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    // function handle
    const handleOnChange = (id) => {
        let updateSelectedIds;
        if (!selectedIds.includes(id)) {
            updateSelectedIds = [...selectedIds, id];
        } else {
            updateSelectedIds = selectedIds.filter((item) => item !== id);
        }
        setSelectedIds(updateSelectedIds);

        setIsSelectedAll(updateSelectedIds.length === data.length);
    };
    const handleOnChangeAll = () => {
        const checkedAll = !isSelectedAll;
        if (checkedAll) {
            data.map((item) => setSelectedIds((press) => [...press, item._id]));
        } else {
            setSelectedIds([]);
        }
        setIsSelectedAll(checkedAll);
    };
    return (
        <div className={cx('wrapper')}>
            <button
                className={cx('selectAll')}
                onClick={() => handleOnChangeAll()}
            >
                {isSelectedAll ? 'Thu Nhỏ Tất Cả' : 'Mở Rộng Tất Cả'}
            </button>
            {data.map((item, index) => (
                <div key={item._id} className={cx('panel')}>
                    <button
                        className={cx('panel-heading')}
                        onClick={() => handleOnChange(item._id)}
                    >
                        <span className={cx('btn-panel')}>
                            {selectedIds.includes(item._id) ? (
                                <IoMdRemoveCircle />
                            ) : (
                                <IoMdAdd />
                            )}
                        </span>
                        <h5>
                            {index + 1}. {item.lessonName}
                        </h5>
                    </button>
                    <div
                        className={cx('collapse', {
                            hidden: !selectedIds.includes(item._id),
                        })}
                    >
                        <div className={cx('description')}>
                            <span>
                                <AiTwotoneNotification />
                            </span>
                            <p>{item.lessonContent}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListLesson;
