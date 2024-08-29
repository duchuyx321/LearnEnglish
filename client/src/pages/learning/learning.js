import classNames from 'classnames/bind';

import styles from './Learning.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Learning() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const handleNext = () => {
        setIsFlipped(false);
        // setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        // setCurrentIndex((prevIndex) =>
        //     // prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1,
        // );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div
                    className={cx('flashCard', { flipped: isFlipped })}
                    onClick={() => handleFlip()}
                >
                    <div className={cx('font')}>
                        <div className={cx('word')}>
                            <h3>Hello</h3>
                        </div>
                        <div className={cx('meaning')}>Xin Chào</div>
                    </div>
                    <div className={cx('after')}>
                        <div className={cx('example')}>
                            Hello, how old are you?
                        </div>
                        <div className={cx('meaningExample')}>
                            Xin chào, bạn bao nhiêu tuổi?
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('controls')}>
                <button onClick={handlePrev}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default Learning;
