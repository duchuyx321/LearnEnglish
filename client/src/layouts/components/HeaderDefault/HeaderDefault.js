/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { RiLoader2Line } from 'react-icons/ri';
import { useDebounce } from 'use-debounce';

import styles from './HeaderDefault.module.scss';
import images from '~/assets';
import PopperWrapper from '~/components/PopperWrapper';
import { search } from '~/service/searchService';

const cx = classNames.bind(styles);

function HeaderDefault({ children }) {
    const [isToken, setIsToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const debounce = useDebounce(valueInput, 5000);
    // authentication token
    useEffect(() => {
        const Token = localStorage.getItem('token');
        if (Token) {
            setIsToken(true);
        }
        setIsToken(false);
    }, []);

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
    }, []);
    const handleOnChangeInput = (e) => {
        setValueInput(e);
    };
    const handleOnClear = () => {
        setValueInput('');
    };
    console.log(debounce);
    const renderValue = (attrs) => {
        return (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                {loading ? <RiLoader2Line /> : <IoIosSearch />}
                {valueInput && !debounce && (
                    <h4>{`Tìm Kiếm Cho : "${valueInput}"`}</h4>
                )}
                {debounce && (
                    <div>
                        {searchResult ? (
                            <h4>{`Kết Quả Tìm Kiếm Cho : "${valueInput}"`}</h4>
                        ) : (
                            <h4>{`Không Có Kết Quả Tìm Kiếm Cho : "${valueInput}"`}</h4>
                        )}
                    </div>
                )}
                {searchResult ? (
                    <PopperWrapper
                        title={'Khóa Học'}
                        className={cx('popperWrapper')}
                    >
                        {searchResult.map((item) => (
                            <div
                                key={item._id}
                                className={cx('search-result-inner')}
                            >
                                <img src={item.image} alt="khóa Học" />
                                <h4 className={cx('title-course')}>
                                    {item.courseName}
                                </h4>
                            </div>
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
                    <div>Đã Đăng nhập</div>
                ) : (
                    <div className={cx('_action')}>Chưa đăng nhập </div>
                )}
            </div>
        </div>
    );
}

export default HeaderDefault;
