import classNames from 'classnames/bind';

import styles from './OverlaySetting.module.scss';
import Button from '~/components/Button';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const cx = classNames.bind(styles);
const DefaultFN = () => {};

function OverlaySetting({ data = {}, handleOnClose = DefaultFN }) {
    console.log(data);
    const handleOnSave = () => {
        //
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button
                    className={cx('btn-close')}
                    onClick={() => handleOnClose()}
                >
                    <IoIosCloseCircleOutline />
                </button>
                <div className={cx('body')}></div>
                <div className={cx('action')}>
                    <Button primary large onClick={() => handleOnSave()}>
                        Lưu Lại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OverlaySetting;
