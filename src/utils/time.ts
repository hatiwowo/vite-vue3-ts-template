export function dateTimeJoin(date: Date) {
    const { year, month, day } = getDate(date);
    const { hour, minute, second } = getTime(date);
    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`;
}

function getDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { year, month, day };
}

function getTime(date: Date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return { hour, minute, second };
}

function formatNumber(n: number | string) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
}
