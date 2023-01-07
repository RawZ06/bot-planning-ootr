function getMonthNumber(monthNameInFrench) {
    const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return monthNames.indexOf(monthNameInFrench);
}

/**
 * @param {string} dateString
 * @returns {Date}
 * Parse french date to format dayOfWeek day monthName year
 */
export function parseCCDate(dateString) {
    // apply regex to get day, month and year from french date to format dayOfWeek day monthName hh:mm
    const regex = /(\w+)\s(\d+)\s(\w+)\s(\d+):(\d+)/;
    const match = dateString.match(regex);
    const day = parseInt(match[2]);
    const monthName = match[3];
    const hour = parseInt(match[4]);
    const minute = parseInt(match[5]);

    // get month number from month name
    const month = getMonthNumber(monthName);
    // return date
    return new Date(new Date().getFullYear(), month, day, hour, minute);
}

export function parseS6Date(dateString) {
    return new Date(dateString);
}