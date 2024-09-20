import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';
import styles from './Reactions.module.scss';

import {
    IconLike,
    IconLove,
    IconCrush,
    IconHaha,
    IconSad,
    IconAngry,
} from '~/components/Icon';

const cx = classNames.bind(styles);

function Reactions() {
    return (
        <div className={cx('wrapper')}>
            <Tippy
                content="Like"
                placement="top"
                animation="scale"
                delay={[100, 200]}
            >
                <IconLike width="4.2rem" height="4.2rem" />
            </Tippy>
            <Tippy
                content="Love"
                placement="top"
                animation="scale"
                delay={[100, 200]}
            >
                <IconLove width="4.2rem" height="4.2rem" />
            </Tippy>
            <Tippy
                content="Crush"
                placement="top"
                animation="scale"
                delay={[100, 200]}
            >
                <IconCrush width="4.2rem" height="4.2rem" />
            </Tippy>
            <Tippy
                content="Haha"
                placement="top"
                animation="scale"
                delay={[100, 200]}
            >
                <IconHaha width="4.2rem" height="4.2rem" />
            </Tippy>
            <Tippy
                content="Sad"
                placement="top"
                animation="scale"
                delay={[100, 200]}
            >
                <IconSad width="4.2rem" height="4.2rem" />
            </Tippy>
            <Tippy
                content="Angry"
                placement="top"
                animation="scale"
                delay={[100, 200]}
            >
                <IconAngry width="4.2rem" height="4.2rem" />
            </Tippy>
        </div>
    );
}

export default Reactions;
