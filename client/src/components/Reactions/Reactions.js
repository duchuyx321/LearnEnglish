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
const LIST_ICON = [
    {
        content: 'Like',
        icon: <IconLike width="4.2rem" height="4.2rem" />,
        iconReply: <IconLike width="4.2rem" height="4.2rem" />,
    },
    {
        content: 'Love',
        icon: <IconLove width="4.2rem" height="4.2rem" />,
        iconReply: <IconLove width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Crush',
        icon: <IconCrush width="4.2rem" height="4.2rem" />,
        iconReply: <IconCrush width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Haha',
        icon: <IconHaha width="4.2rem" height="4.2rem" />,
        iconReply: <IconHaha width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Sad',
        icon: <IconSad width="4.2rem" height="4.2rem" />,
        iconReply: <IconSad width="3.2rem" height="3.2rem" />,
    },
    {
        content: 'Angry',
        icon: <IconAngry width="4.2rem" height="4.2rem" />,
        iconReply: <IconAngry width="3.2rem" height="3.2rem" />,
    },
];

const DefaultFN = () => {};
function Reactions({ handleOnClick = DefaultFN }) {
    return (
        <div className={cx('wrapper')}>
            {LIST_ICON.map((item, index) => (
                <Tippy
                    key={index}
                    content={item.content}
                    placement="top"
                    animation="scale"
                    delay={[100, 100]}
                >
                    <button onClick={() => handleOnClick(item.content)}>
                        {item.icon}
                    </button>
                </Tippy>
            ))}
        </div>
    );
}

export default Reactions;
