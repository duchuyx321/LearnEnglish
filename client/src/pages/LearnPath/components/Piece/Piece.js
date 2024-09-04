import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Piece.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Piece({ data = {} }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h3>{data.other.namePath}</h3>
                    <p>{data.other.descriptionPath}</p>
                </div>
                <div className={cx('thumb')}>
                    <Image src={data.other.image} alt="Image Learn Path" />
                </div>
            </div>
            <div className={cx('cta')}>
                {data?.courseList?.map((item) => (
                    <Tippy
                        key={item._id}
                        content={item.courseName}
                        delay={[1000, 500]}
                        placement="top"
                    >
                        <Link
                            to={`/courses/${item.slug}`}
                            className={cx('element')}
                        >
                            <Image
                                src={item.image}
                                alt="Image Course"
                                className={cx('img-element')}
                            />
                        </Link>
                    </Tippy>
                ))}
            </div>
            <div className={cx('start-now')}>
                <Button primary className={cx('btn-start')}>
                    Bắt Đầu Ngay !
                </Button>
            </div>
        </div>
    );
}

export default Piece;
