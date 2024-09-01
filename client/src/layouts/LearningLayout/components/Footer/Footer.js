/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Footer.module.scss';
import Button from '~/components/Button';
import { useScreenWidth } from '~/hooks';
import { updateProgress } from '~/service/progressService';

const cx = classNames.bind(styles);

const defaultFn = () => {};
function Footer({
    handleOnHiddenSidebar = defaultFn,
    data = [],
    progress = {},
}) {
    const [isMenu, setIsMenu] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [timerCompleted, setTimerCompleted] = useState(false);
    const screenWidth = useScreenWidth();
    const location = useLocation();
    const navigate = useNavigate();
    // useMemo
    const searchParams = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );
    const id = useMemo(() => searchParams.get('id'), [searchParams]);
    // useCallback
    const findLessonIndex = useCallback((lessons, id) => {
        return lessons?.findIndex((lesson) => lesson._id === id) ?? 0;
    }, []);

    const indexProgress = useMemo(
        () => findLessonIndex(data?.lessons, progress?.lessonID),
        [data.lessons, id],
    );
    const index = useMemo(
        () => findLessonIndex(data?.lessons, id),
        [data.lessons, id],
    );
    const timeoutDuration = 600000;
    // useEffect
    useEffect(() => {
        if (screenWidth <= 1024) {
            setIsMenu(true);
        } else {
            setIsMenu(false);
        }
    }, [screenWidth]);
    useEffect(() => {
        if (index !== -1) {
            setIsButtonDisabled(true);
            setTimerCompleted(false);

            const timer = setTimeout(async () => {
                if (index > indexProgress) {
                    const courseID = data?._id;
                    const lessonID = data?.lessons[index]?._id;
                    await updateProgress(lessonID, courseID);
                }
                setTimerCompleted(true);
            }, timeoutDuration);
            return () => clearTimeout(timer);
        }
    }, [index]);

    useEffect(() => {
        if (timerCompleted) {
            setIsButtonDisabled(false);
        }
    }, [timerCompleted]);

    // function handle
    const handleOnNext = (index) => {
        if (index < data.lessons.length && !isButtonDisabled) {
            navigate(`/learning/${data?.slug}?id=${data?.lessons[index]._id}`);
        }
    };
    const handleOnPrev = (index) => {
        if (index >= 0) {
            console.log(data.lessons[index]._id);
            navigate(`/learning/${data?.slug}?id=${data?.lessons[index]._id}`);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Button
                    outline
                    disabled={index === 0}
                    onClick={() => handleOnPrev(index - 1)}
                >
                    Bài Học Trước
                </Button>
                <Button
                    primary
                    disabled={
                        index >= data?.lessons?.length || isButtonDisabled
                    }
                    onClick={() => handleOnNext(index + 1)}
                >
                    Bài Học Tiếp THeo
                </Button>
            </div>
            {isMenu && (
                <button
                    className={cx('menu')}
                    onClick={() => handleOnHiddenSidebar()}
                >
                    <IoMenu />
                </button>
            )}
        </div>
    );
}

export default Footer;
