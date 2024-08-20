import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');
export const formatTime = (time) => {
    const timeFormat = dayjs(time).fromNow();
    return timeFormat;
};
