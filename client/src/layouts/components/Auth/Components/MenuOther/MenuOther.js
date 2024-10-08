import classNames from 'classnames/bind';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import styles from './MenuOther.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

const MENU_OTHER = [
    {
        key: 'google',
        content: 'Tiếp Tục Với Google',
        icon: <FcGoogle />,
    },
    {
        key: 'facebook',
        content: 'Tiếp Tục Với Facebook',
        image: images.iconFB,
    },
    {
        key: 'std',
        content: 'Tiếp Tục Với Google',
        icon: <FcGoogle />,
    },
    {
        key: 'github',
        content: 'Tiếp Tục Với Google',
        icon: <FcGoogle />,
    },
];
console.log(process.env.REACT_APP_URL_SERVER);
function MenuOther() {
    return (
        <div className={cx('wrapper')}>
            {MENU_OTHER.map((item) => (
                <Link
                    key={item.key}
                    to={`${process.env.REACT_APP_URL_SERVER}/api/auth/${item.key}`}
                    className={cx('boxContainer')}
                >
                    <div className={cx('icon')}>
                        {item.icon ? (
                            item.icon
                        ) : (
                            <img
                                className={cx('img_icon')}
                                src={item.image}
                                alt={item.key}
                            />
                        )}
                    </div>
                    <div className={cx('content')}>{item.content}</div>
                </Link>
            ))}
        </div>
    );
}

export default MenuOther;
