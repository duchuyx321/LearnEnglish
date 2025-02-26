/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Admin.module.scss';
import SideBar from '~/layouts/Admin/components/Sidebar';

const cx = classNames.bind(styles);

function Admin({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token').split(' ')[1];
        const decode = jwtDecode(token);
        if (!token || decode.role !== 'admin') {
            return navigate('/');
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <SideBar />
            </div>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default Admin;
