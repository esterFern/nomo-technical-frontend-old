const changeDateFormat = (date, onlyDay) => {
  const month = date.getMonth() + 1;
  if (onlyDay) {
    return `${checkNumberFormat(date.getDate())}/${checkNumberFormat(
      month
    )}/${date.getFullYear()}`;
  } else {
    return `${date.getDate()}/${checkNumberFormat(
      month
    )}/${date.getFullYear()} ${checkNumberFormat(
      date.getHours()
    )}:${checkNumberFormat(date.getMinutes())}:${checkNumberFormat(
      date.getSeconds()
    )}`;
  }
};

const checkNumberFormat = (number) => {
  return number < 10 ? `0${number}` : number;
};

const checkDateFormat = (date) => {
  const pattern = new RegExp(
    "^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$"
  );
  if (date.search(pattern) === 0) {
    return true;
  } else {
    return false;
  }
};

exports.changeDateFormat = changeDateFormat;

exports.checkDateFormat = checkDateFormat;
