import classNames from 'classnames/bind';
import { FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

import styles from './Item.module.scss';
import Image from '~/components/Image';
import images from '~/assets';
import Overlay from '~/pages/Setting/components/Personal/Components/Overlay';
import OverlaySetting from '~/pages/Setting/components/Security/Components/OverlaySetting';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function Item({ data = {}, handleOnRefresh = DefaultFN, type = '' }) {
    const [isOverlay, setIsOverlay] = useState(false);
    const handleOnOverlay = () => {
        setIsOverlay(!isOverlay);
    };
    return (
        <div className={cx('wrapper')}>
            <button
                className={cx('btn-Item')}
                onClick={() => handleOnOverlay()}
            >
                <div className={cx('content')}>
                    <h3>{data.title}</h3>
                    {data.key === 'image' ? (
                        <div className={cx('img-item')}>
                            <Image
                                src={data?.content || images.noImage}
                                alt={data?.title}
                            />
                        </div>
                    ) : (
                        <p>
                            {type === 'Personal'
                                ? data.content || 'Chưa cập nhật'
                                : null}
                        </p>
                    )}
                </div>
                <div className={cx('icon-icon')}>
                    <FaChevronRight />
                </div>
            </button>
            {isOverlay && (
                <>
                    {type === 'Personal' && (
                        <Overlay
                            handleRerender={handleOnRefresh}
                            data={data}
                            handleOnClose={handleOnOverlay}
                        />
                    )}
                    {type === 'Security' && (
                        <OverlaySetting
                            data={data}
                            handleOnClose={handleOnOverlay}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Item;
