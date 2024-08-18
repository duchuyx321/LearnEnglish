import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseCircleOutline, IoNotifications } from 'react-icons/io5';
import { RiLoader2Line } from 'react-icons/ri';

import styles from './HeaderDefault.module.scss';
import images from '~/assets';
import PopperWrapper from '~/components/PopperWrapper';
import { search } from '~/service/searchService';
import { user } from '~/service/userService';
import { useDebounce } from '~/hooks';
import Button from '~/components/Button';
import Image from '~/components/Image';
import MenuPopper from '~/components/PopperWrapper/MenuPopper';
import MenuItem from '~/components/PopperWrapper/MenuItem';

const cx = classNames.bind(styles);

function HeaderDefault({ children }) {
    const [isToken, setIsToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [userResult, setUserResult] = useState({});

    const debounce = useDebounce(valueInput, 2000);
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
                                to={`/@${item.slug}`}
                                key={item._id}
                                className={cx('search-result-inner')}
                            >
                                <img
                                    src={
                                        item.image ||
                                        'https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/1d9206ca61d04b830f4c7819744a02af.jpeg?lk3s=a5d48078&nonce=40877&refresh_token=dd6021f1e2347cfa047eed14db2fdf4b&x-expires=1723950000&x-signature=nK0AHoyYyPkAH2quwNn2gsC6zCw%3D&shp=a5d48078&shcp=81f88b70'
                                    }
                                    alt="khóa Học"
                                />
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
                <Link to="/" className={cx('subtitle')}>
                    Học Tiếng Anh
                </Link>
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
                            <Tippy
                                interactive={true}
                                appendTo="parent"
                                placement="bottom-end"
                                duration={[200]}
                                delay={[50]}
                                offset={[0, 9]} // Điều chỉnh khoảng cách ngang và dọc
                                trigger="click" // Chỉ hiện khi click
                                render={(attrs) => (
                                    <div
                                        className={cx('Menu-list')}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <MenuPopper
                                            large
                                            title={'Khóa Học Của Tôi'}
                                            extend={!!userResult.progress}
                                        >
                                            {userResult?.progress ? (
                                                'Có Khóa Học Đang theo '
                                            ) : (
                                                <h4
                                                    className={cx(
                                                        'menu-list-alert',
                                                    )}
                                                >
                                                    Chưa Có Khóa Học Nào !
                                                </h4>
                                            )}
                                        </MenuPopper>
                                    </div>
                                )}
                            >
                                <button
                                    className={cx('myLearn-btn')}
                                    aria-describedby=""
                                >
                                    KHóa Học Của tôi
                                </button>
                            </Tippy>
                        </div>
                        <div className={cx('notification')}>
                            <Tippy
                                interactive={true}
                                appendTo="parent"
                                placement="bottom-end"
                                duration={[200]}
                                delay={[50]}
                                offset={[0, 5]} // Điều chỉnh khoảng cách ngang và dọc
                                trigger="click" // Chỉ hiện khi click
                                render={(attrs) => (
                                    <div
                                        className={cx('Menu-list')}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <MenuPopper
                                            large
                                            title={'Thông Báo'}
                                            extend={!!userResult.progress}
                                        >
                                            {userResult?.progress ? (
                                                'Có Khóa Học Đang theo '
                                            ) : (
                                                <h4
                                                    className={cx(
                                                        'menu-list-alert',
                                                    )}
                                                >
                                                    Không có thông báo nào
                                                </h4>
                                            )}
                                        </MenuPopper>
                                    </div>
                                )}
                            >
                                <button className={cx('notification-btn')}>
                                    <IoNotifications />
                                </button>
                            </Tippy>
                        </div>
                        <div className={cx('avatar')}>
                            <Tippy
                                interactive={true}
                                appendTo="parent"
                                placement="bottom-end"
                                duration={[200]}
                                delay={[50]}
                                offset={[0, 10]} // Điều chỉnh khoảng cách ngang và dọc
                                trigger="click" // Chỉ hiện khi click
                                render={(attrs) => (
                                    <div
                                        className={cx('Menu-list')}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <MenuPopper>
                                            <div className={cx('user')}>
                                                <div
                                                    className={cx('user-inner')}
                                                >
                                                    <Image
                                                        className={cx(
                                                            'avatar-img',
                                                        )}
                                                        src={
                                                            userResult?.profile
                                                                ?.avatar ||
                                                            images.noImage
                                                        }
                                                        alt="avatar"
                                                    />
                                                </div>
                                                <Link
                                                    to={`@${userResult?.user?.username}`}
                                                    className={cx(
                                                        'use-description',
                                                    )}
                                                >
                                                    <h3 className={cx('name')}>
                                                        {`${userResult?.profile?.first_name} ${userResult?.profile?.last_name}`}
                                                    </h3>
                                                    <span
                                                        className={cx(
                                                            'username',
                                                        )}
                                                    >
                                                        {`@${userResult?.user?.username}`}
                                                    </span>
                                                </Link>
                                            </div>
                                            <MenuItem
                                                username={
                                                    userResult?.user?.username
                                                }
                                            />
                                        </MenuPopper>
                                    </div>
                                )}
                            >
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
                            </Tippy>
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
