/**
 * 判断是否是平闰年
 * @param {*} year 
 */
function isLeapYear(year) {
    let isLeapYear = false;
    if (year % 4 === 0 && year % 100 !== 0) {
        isLeapYear = true;
    } else if (year % 100 === 0 && year % 400 === 0) {
        isLeapYear = true;
    } else if (year % 100 === 0 && year % 400 !== 0) {
        isLeapYear = false;
    }
    return isLeapYear;
}

export function TimeCreator() {
    const hour = [];
    const minutes = [];

    for (let hourIndex = 0 ; hourIndex < 24; hourIndex++) {
        if (hourIndex < 10) {
            hour.push('0' + hourIndex);
        } else {
            hour.push(hourIndex.toString());
        }
    }

    for (let minIndex = 0 ; minIndex < 60; minIndex++) {
        if (minIndex < 10) {
            minutes.push('0' + minIndex);
        } else {
            minutes.push(minIndex.toString());
        }
    }

    return [
        hour,
        minutes
    ]
}

export function DateCreator() {
    const date = [];
    for (let index = 1900; index < 2100; index++) {
        const obj = {};
        obj[index] = [];
        for (let index_mon = 1; index_mon <= 12; index_mon++) {
            const obj_mon = {};
            obj_mon[index_mon] = [];
            for (let index_day = 1; index_day <= 31; index_day++) {
                if (isLeapYear(index)) {
                    if (index_mon === 2) {
                        if (index_day < 29) {
                            obj_mon[index_mon].push(index_day);
                        }
                    } else {
                        obj_mon[index_mon].push(index_day);
                    }
                } else {
                    if (index_mon === 2) {
                        if (index_day < 30) {
                            obj_mon[index_mon].push(index_day);
                        }
                    } else {
                        obj_mon[index_mon].push(index_day);
                    }
                }
            }
            obj[index].push(obj_mon);
        }
        date.push(obj);
    }
    return date;
}
