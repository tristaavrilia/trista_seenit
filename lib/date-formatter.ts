import dayjs from 'dayjs';

export function dateFormatter(
    date: Date | string | number,
    format: string = 'DD MMM, YYYY',
): string {
    try {
        date = new Date(date);
    } catch (err: any) {
        return 'Invalid date';
    }

    return dayjs(date).format(format);
}
