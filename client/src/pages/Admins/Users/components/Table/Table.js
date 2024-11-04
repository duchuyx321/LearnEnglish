/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { CiUnlock, CiLock } from 'react-icons/ci';

import styles from './Table.module.scss';
import { getAllUsers } from '~/service/AdminService';

const cx = classNames.bind(styles);

function Table() {
    const [isLock, setIsLock] = useState(false);
    const [isSort, setIsSort] = useState(false);
    useEffect(() => {
        fetchAPI();
    }, [isSort]);
    const handleOnClick = () => {
        setIsLock(!isLock);
    };
    //fetch api
    const fetchAPI = async () => {
        const type = isSort ? 'desc' : 'asc';
        const result = await getAllUsers({ sort: type });
        console.log(result);
    };
    return (
        <div className={cx('wrapper')}>
            <table border="1">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Tên người dùng</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Access level</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={cx('td-input')}>
                            <input type="checkbox" />
                        </td>
                        <td>1</td>
                        <td>Đức Huy</td>
                        <td>duchuyx321</td>
                        <td>duchuyx321@gmail.com</td>
                        <td className={cx('td_lock')}>
                            <button onClick={() => handleOnClick()}>
                                <div className={cx({ locked: isLock })}>
                                    {isLock ? <CiLock /> : <CiUnlock />}
                                </div>
                                <p>User</p>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;
