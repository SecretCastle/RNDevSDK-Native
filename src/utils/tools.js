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
    const year = [];
    const month = [];
    const day = [];

    return [
        year,
        month,
        day
    ]
}