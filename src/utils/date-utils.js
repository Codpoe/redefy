const methods = {
    yyyy: date => date.getFullYear(),
    yy: date => ('' + date.getFullYear()).slice(-2),
    MM: date => ('0' + (date.getMonth() + 1)).slice(-2),
    M: date => date.getMonth() + 1,
    dd: date => ('0' + date.getDate()).slice(-2),
    d: date => date.getDate(),
    HH: date => ('0' + date.getHours()).slice(-2),
    H: date => date.getHours(),
    hh: date => ('0' + (date.getHours() === 12 ? 12 : date.getHours() % 12)).slice(-2),
    h: date => date.getHours() === 12 ? 12 : date.getHours() % 12,
    mm: date => ('0' + date.getMinutes()).slice(-2),
    m: date => date.getMinutes(),
    ss: date => ('0' + date.getSeconds()).slice(-2),
    s: date => date.getSeconds(),
    w: date => ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
};

export const compose = (date, fields) => {
    let result;

    fields.forEach(field => {
        result[field] = methods[field](date);
    });

    return result;
}

export const format = (date, str) => {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return;
    }

    return str.replace(/([a-z]+)/ig, item => methods[item](date))
}

export const getMonthLength = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}