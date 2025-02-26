import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { CiUnlock, CiLock } from 'react-icons/ci';
import { PiShieldCheckeredFill } from 'react-icons/pi';

import styles from './Table.module.scss';
import { getAllUsers } from '~/service/AdminService';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Table() {
    const [listLock, setListLock] = useState([]);
    const [listLockReq, setListLockReq] = useState([]);
    const [isSort, setIsSort] = useState(false);
    const [userList, setUserList] = useState([]);

    const debounce = useDebounce(listLock, 2000);
    useEffect(() => {
        //fetch api
        const fetchAPI = async () => {
            const type = isSort ? 'desc' : 'asc';
            const result = await getAllUsers({ sort: type });
            setUserList(result);
            const lockeIDs = result.reduce((acc, user) => {
                if (user.role !== 'admin') {
                    acc.push({ _id: user._id, deleted: user.deleted });
                }
                return acc;
            }, []);
            setListLock(lockeIDs);
        };
        fetchAPI();
    }, [isSort]);
    useEffect(() => {
        if (!debounce) {
            setListLock([]);
            return;
        }
        const fetchApi = async () => {
            // const result = await
        };
    }, [debounce]);

    const handleOnClick = (id = '', role = '', Deleted) => {
        if (role !== 'admin') {
            setListLock((prevListLock) => {
                // Cập nhật trạng thái deleted trong listLock
                const updatedList = prevListLock.map((user) =>
                    user._id === id
                        ? { ...user, deleted: !user.deleted }
                        : user,
                );

                // Cập nhật trạng thái trong listLockReq
                setListLockReq((prevListLockReq) => {
                    const index = prevListLockReq.findIndex(
                        (user) => user._id === id,
                    );
                    if (index !== -1) {
                        // Đảo ngược giá trị deleted
                        prevListLockReq[index].deleted =
                            !prevListLockReq[index].deleted;
                    } else {
                        // Thêm mới nếu chưa có trong listLockReq
                        prevListLockReq.push({ _id: id, deleted: !Deleted });
                    }
                    return [...prevListLockReq];
                });

                return updatedList;
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <table border="1">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Access level</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((item, index) => (
                        <tr key={item._id}>
                            <td className={cx('td-input')}>
                                <input type="checkbox" />
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td className={cx('td_lock')}>
                                <button
                                    onClick={() =>
                                        handleOnClick(
                                            item._id,
                                            item.role,
                                            item.deleted,
                                        )
                                    }
                                >
                                    {item.role === 'admin' ? (
                                        <div>
                                            <PiShieldCheckeredFill />
                                        </div>
                                    ) : (
                                        <div>
                                            {listLock.find(
                                                (user) => user._id === item._id,
                                            )?.deleted ? (
                                                <CiLock />
                                            ) : (
                                                <CiUnlock />
                                            )}
                                        </div>
                                    )}
                                    <p>{item.role}</p>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
