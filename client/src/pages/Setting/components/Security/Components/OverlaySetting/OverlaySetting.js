import classNames from 'classnames/bind';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import styles from './OverlaySetting.module.scss';
import Password from '~/pages/Setting/components/Security/Components/Password';
import Authentication from '~/pages/Setting/components/Security/Components/Authentication';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function OverlaySetting({ data = {}, handleOnClose = DefaultFN }) {
    console.log(data);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button
                    className={cx('btn-close')}
                    onClick={() => handleOnClose()}
                >
                    <IoIosCloseCircleOutline />
                </button>
                <div className={cx('body')}>
                    {data?.key === 'password' && <Password />}
                    {data?.key === '2fa' && <Authentication />}
                </div>
            </div>
        </div>
    );
}

export default OverlaySetting;
