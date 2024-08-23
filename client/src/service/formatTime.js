import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');
export const formatTime = (time) => {
    const timeFormat = dayjs(time).fromNow();
    return timeFormat;
};

export const formatDay = (time) => {
    const date = new Date(time);
    const formattedDate = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
    return formattedDate;
};
