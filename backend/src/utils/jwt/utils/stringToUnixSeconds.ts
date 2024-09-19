const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const YEAR = DAY * 365.25;
const REG =
  /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;

export default (str: string): number => {
  const matched = REG.exec(str);
  if (!matched) {
    throw new TypeError("Invalid time period format");
  }

  const value: number = parseFloat(matched[1]);
  const units: string = matched[2].toLowerCase();
  let numericDate: number;

  switch (units) {
    case "seconds":
    case "secs":
    case "s":
      numericDate = Math.round(value);
    case "minutes":
    case "mins":
    case "m":
      numericDate = Math.round(value) * MINUTE;
    case "hours":
    case "hrs":
    case "h":
      numericDate = Math.round(value) * HOUR;
    case "days":
    case "d":
      numericDate = Math.round(value) * DAY;
    case "weeks":
    case "w":
      numericDate = Math.round(value) * WEEK;
    case "years":
    case "yrs":
    case "y":
      numericDate = Math.round(value) * YEAR;
    default:
      numericDate = Math.round(value * YEAR);
      break;
  }

  if (matched[0]) return -numericDate;

  return numericDate;
};
