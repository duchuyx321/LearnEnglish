import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import styles from './Blog.module.scss';
import Articles from './components/Articles';
import { getBlogs } from '~/service/BlogService';

const cx = classNames.bind(styles);

const headerDescription =
    'Tổng hợp những bài viết chất lượng, chia sẻ kinh nghiệm tự học tiếng Anh,cùng các phương pháp và kỹ thuật học tập hiệu quả để giúp bạn cải thiện khả năng ngoại ngữ một cách nhanh chóng và tự tin.';

function Blog() {
    const [resultBlogs, setResultBlogs] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || '1';
    useEffect(() => {
        fetchAPI(page);
    }, [page]);
    // call api
    const fetchAPI = async (page) => {
        const result = await getBlogs(page);
        setResultBlogs(result);
    };
    // render
    const renderPagePrev = (page) => {
        const pages = [];
        let num = Math.max(1, page - 4); // không vượt quá 1
        for (let i = num; i < page; i++) {
            pages.push(
                <button
                    key={i}
                    className={cx('page')}
                    onClick={() => handleOnNext(i)}
                >
                    {i}
                </button>,
            );
        }
        return pages;
    };
    const renderPageNext = (totalPage) => {
        const pages = [];
        const num = Math.min(totalPage, page + 5); // không vượt quá tổng số trang
        for (let i = page + 1; i <= num; i++) {
            pages.push(
                <button
                    key={i}
                    className={cx('page')}
                    onClick={() => handleOnNext(i)}
                >
                    {i}
                </button>,
            );
        }
        return pages;
    };

    // handle
    const handleOnNext = (page) => {
        navigate(`/blog?page=${page}`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3>Bài Viết Nổi Bật</h3>
                <p>{headerDescription}</p>
            </div>
            <div className={cx('body')}>
                {resultBlogs?.data?.map((item) => (
                    <Articles key={item._id} data={item} />
                ))}
            </div>
            <div className={cx('footer')}>
                <button className={cx('btn-prev', { disabled: page === 1 })}>
                    <FaAngleDoubleLeft />
                </button>
                <div className={cx('list-page')}>
                    {page - 1 > 0 && (
                        <div className={cx('list-page-previous')}>
                            {renderPagePrev(page)}
                        </div>
                    )}
                    <div className={cx('list-page-current')}>{page}</div>
                    {page <= parseInt(resultBlogs.total) && (
                        <div className={cx('list-page-next')}>
                            {renderPageNext(parseInt(resultBlogs.total))}
                        </div>
                    )}
                </div>
                <button
                    className={cx('btn-next', {
                        disabled: page === resultBlogs.total,
                    })}
                >
                    <FaAngleDoubleRight />
                </button>
            </div>
        </div>
    );
}

export default Blog;
