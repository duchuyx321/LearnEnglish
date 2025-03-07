/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineVolumeUp } from 'react-icons/md';

import styles from './Learning.module.scss';
import { getVocabulary } from '~/service/VocabularyService';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Learning() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isOddClick, setIsOddClick] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [resultVocabulary, setResultVocabulary] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const audioRef = useRef();

    useEffect(() => {
        if (id) {
            fetchAPiVocabulary(id);
        }
    }, [id]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setIsOddClick(false);
        setCurrentIndex((prevIndex) =>
            prevIndex === resultVocabulary.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setIsOddClick(false);

        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? resultVocabulary.length - 1 : prevIndex - 1,
        );
    };
    const handleOnPlay = () => {
        if (isOddClick) {
            audioRef.current.playbackRate = 0.6;
        } else {
            audioRef.current.playbackRate = 1;
        }
        audioRef.current.play();
        setIsOddClick(!isOddClick);
    };
    const fetchAPiVocabulary = async (lessonID) => {
        const result = await getVocabulary(lessonID);
        setResultVocabulary(result);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {resultVocabulary.length > 0 && (
                    <div>
                        <div
                            key={resultVocabulary[currentIndex]._id}
                            className={cx('flashCard', { flipped: isFlipped })}
                            onClick={() => handleFlip()}
                        >
                            <div className={cx('font')}>
                                <div className={cx('word')}>
                                    <h3>
                                        {resultVocabulary[currentIndex].word}
                                    </h3>
                                </div>
                                <div className={cx('meaning')}>
                                    {resultVocabulary[currentIndex].definition}
                                </div>
                            </div>
                            <div className={cx('after')}>
                                <div className={cx('example')}>
                                    {resultVocabulary[currentIndex].example}
                                </div>
                                <div className={cx('meaningExample')}>
                                    {
                                        resultVocabulary[currentIndex]
                                            .meaningExample
                                    }
                                </div>
                            </div>
                        </div>
                        <button
                            className={cx('flashCard-btn')}
                            onClick={() => handleOnPlay()}
                        >
                            <MdOutlineVolumeUp />
                            <audio
                                ref={audioRef}
                                className={cx('audio')}
                                src={resultVocabulary[currentIndex].audioUrl}
                            ></audio>
                        </button>
                    </div>
                )}
            </div>
            <div className={cx('controls')}>
                <Button
                    outline
                    small
                    onClick={() => handlePrev()}
                    className={cx('Previous')}
                >
                    Previous
                </Button>
                <Button primary small onClick={() => handleNext()}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default Learning;
