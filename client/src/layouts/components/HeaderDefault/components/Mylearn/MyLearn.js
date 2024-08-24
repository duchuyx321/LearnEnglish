import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Mylearn.module.scss';
import MenuPopper from '~/components/PopperWrapper/MenuPopper';
import { combined } from '~/service/progressService';

const cx = classNames.bind(styles);

function Mylearn({ children }) {
    const [valueRender, setValueRender] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return;
        }
        const fetchAPI = async () => {
            const result = await combined();
            setValueRender(result);
        };
        fetchAPI();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive={true}
                appendTo="parent"
                placement="bottom-end"
                duration={[200]}
                delay={[50]}
                offset={[0, 9]} // Điều chỉnh khoảng cách ngang và dọc
                trigger="click" // Chỉ hiện khi click
                render={(attrs) => (
                    <div className={cx('Menu-list')} tabIndex="-1" {...attrs}>
                        <MenuPopper
                            large
                            title={'Khóa Học Của Tôi'}
                            extend={valueRender.length > 0}
                        >
                            {valueRender.length > 0 ? (
                                <div className={cx('content')}>
                                    {valueRender.map((item) => (
                                        <Link
                                            to={`/courses/${item.progress.course.slug}`}
                                            key={item.progress._id}
                                            className={cx('inner')}
                                        >
                                            <div className={cx('wrapper-img')}>
                                                <img
                                                    src={
                                                        item.progress.course
                                                            .image
                                                    }
                                                    alt="ảnh khóa học"
                                                />
                                            </div>
                                            <h3 className={cx('name-course')}>
                                                {
                                                    item.progress.course
                                                        .courseName
                                                }
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <h4 className={cx('menu-list-alert')}>
                                    Chưa Có Khóa Học Nào !
                                </h4>
                            )}
                        </MenuPopper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Mylearn;
