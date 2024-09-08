import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseCircleOutline, IoNotifications } from 'react-icons/io5';
import { BiChevronsLeft } from 'react-icons/bi';
import { RiLoader2Line } from 'react-icons/ri';

import styles from './HeaderDefault.module.scss';
import images from '~/assets';
import PopperWrapper from '~/components/PopperWrapper';
import { search } from '~/service/searchService';
import { user } from '~/service/userService';
import { useDebounce } from '~/hooks';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Mylearn from '~/layouts/components/HeaderDefault/components/Mylearn';
import Notification from '~/layouts/components/HeaderDefault/components/notification';
import Avatar from '~/layouts/components/HeaderDefault/components/Avatar';

const cx = classNames.bind(styles);

function HeaderDefault() {
    const [isToken, setIsToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [userResult, setUserResult] = useState({});

    const debounce = useDebounce(valueInput, 2000);
    const location = useLocation();
    const navigate = useNavigate();
    // authentication token
    useEffect(() => {
        const Token = localStorage.getItem('token');
        if (Token) {
            setIsToken(true);
            const fetchAPI = async () => {
                const result = await user();
                if (result) {
                    setUserResult(result);
                }
            };
            fetchAPI();
            return;
        }
        setIsToken(false);
    }, []);
    // Tách đường dẫn hiện tại thành mảng bằng cách phân tách dấu "/" [filter(Boolean) loại bỏ phần tử trống trước /]
    const pathSegments = location.pathname.split('/').filter(Boolean);
    // API search
    useEffect(() => {
        if (!debounce) {
            setSearchResult([]);
            return;
        }
        const fetchAPI = async () => {
            setLoading(true);

            const result = await search(debounce);

            setSearchResult(result);
            setLoading(false);
        };
        fetchAPI();
    }, [debounce]);
    const handleOnChangeInput = (e) => {
        setValueInput(e);
    };
    const handleOnClear = () => {
        setValueInput('');
    };
    const handleOnBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    // render tippy
    const renderValue = (attrs) => {
        return (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <div className={cx('search-result-title')}>
                    <span className={'search-result-icon'}>
                        {loading ? (
                            <span className={cx('loading')}>
                                <RiLoader2Line />
                            </span>
                        ) : (
                            <IoIosSearch />
                        )}
                    </span>
                    {valueInput && !debounce && (
                        <h4>{`Tìm Kiếm Cho : "${valueInput}"`}</h4>
                    )}
                    {debounce && (
                        <div className={cx('search-title-alert')}>
                            {searchResult ? (
                                <h4>{`Kết Quả Tìm Kiếm Cho : "${valueInput}"`}</h4>
                            ) : (
                                <h4>{`Không Có Kết Quả Tìm Kiếm Cho : "${valueInput}"`}</h4>
                            )}
                        </div>
                    )}
                </div>

                {searchResult.length > 0 ? (
                    <PopperWrapper
                        title={'Khóa Học :'}
                        className={cx('popperWrapper')}
                    >
                        {searchResult.map((item) => (
                            <Link
                                to={`/courses/${item.slug}`}
                                key={item._id}
                                className={cx('search-result-inner')}
                            >
                                <span className={cx('search-result-inner-img')}>
                                    <img
                                        src={
                                            item.image ||
                                            'https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/1d9206ca61d04b830f4c7819744a02af.jpeg?lk3s=a5d48078&nonce=40877&refresh_token=dd6021f1e2347cfa047eed14db2fdf4b&x-expires=1723950000&x-signature=nK0AHoyYyPkAH2quwNn2gsC6zCw%3D&shp=a5d48078&shcp=81f88b70'
                                        }
                                        alt="khóa Học"
                                    />
                                </span>
                                <h4 className={cx('title-course')}>
                                    {item.courseName}
                                </h4>
                            </Link>
                        ))}
                    </PopperWrapper>
                ) : null}
            </div>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('_Logo')}>
                <Link to="/">
                    <img
                        className={cx('img-logo')}
                        src={images.logo}
                        alt="Logo LearnEnglish"
                    />
                </Link>
                {pathSegments.length <= 1 ? (
                    <Link to="/" className={cx('subtitle')}>
                        Học Tiếng Anh
                    </Link>
                ) : (
                    <button
                        onClick={() => handleOnBack()}
                        className={cx('btn-back')}
                    >
                        <BiChevronsLeft />
                        <p>Quay Lại</p>
                    </button>
                )}
            </h1>
            <div className={cx('_body')}>
                <Tippy
                    visible={valueInput.length > 0}
                    interactive={true}
                    appendTo={document.body}
                    render={(attrs) => renderValue(attrs)}
                >
                    <div className={cx('_search')}>
                        <div className={cx('inner')}>
                            <div className={cx('inner-search')}>
                                <div className={cx('icon-search')}>
                                    <IoIosSearch />
                                </div>
                                <input
                                    value={valueInput}
                                    className={cx('input-search')}
                                    placeholder="Tìm Kiếm Khóa Học..."
                                    onChange={(e) =>
                                        handleOnChangeInput(e.target.value)
                                    }
                                />
                                <button
                                    className={cx('icon-search-clear', {
                                        hidden: !!!valueInput,
                                    })}
                                    onClick={handleOnClear}
                                >
                                    <IoCloseCircleOutline />
                                </button>
                            </div>
                        </div>
                    </div>
                </Tippy>
            </div>
            <div className={cx('_action')}>
                {isToken ? (
                    <div className={cx('portal')}>
                        <div className={cx('myLearn')}>
                            <Mylearn>
                                <button
                                    className={cx('myLearn-btn')}
                                    aria-describedby=""
                                >
                                    KHóa Học Của tôi
                                </button>
                            </Mylearn>
                        </div>
                        <div className={cx('notification')}>
                            <Notification>
                                <button className={cx('notification-btn')}>
                                    <IoNotifications />
                                </button>
                            </Notification>
                        </div>
                        <div className={cx('avatar')}>
                            <Avatar userResult={userResult}>
                                <button className={cx('avatar-btn')}>
                                    <Image
                                        className={cx('avatar-img')}
                                        src={
                                            userResult?.profile?.avatar ||
                                            images.noImage
                                        }
                                        alt="avatar"
                                    />
                                </button>
                            </Avatar>
                        </div>
                    </div>
                ) : (
                    <div className={cx('_action')}>
                        <Button outlineText>Đăng Ký</Button>
                        <Button primary text>
                            Đăng Nhập
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HeaderDefault;
