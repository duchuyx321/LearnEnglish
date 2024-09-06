import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page'));

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
        let i = 1;
        if (page - 4) {
            i = page - 4;
        }
        for (i; i < page; i++) {
            pages.push(
                <div key={i} className={cx('page')}>
                    {i}
                </div>,
            );
        }
        return pages;
    };
    const renderPageNext = (totalPage) => {
        console.log(totalPage);
        const pages = [];
        let i = page + 1;
        console.log(i);
        for (i; i < totalPage; i++) {
            pages.push(
                <div key={i} className={cx('page')}>
                    {i}
                </div>,
            );
        }
        return pages;
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
                            {parseInt(resultBlogs.total) - 4 > 0
                                ? renderPageNext(page + 5)
                                : renderPageNext(parseInt(resultBlogs.total))}
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
