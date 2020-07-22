const changeDateFormat = (date, onlyDay) => {
  const month = date.getMonth() + 1;
  if (onlyDay) {
    return `${date.getDate()}/${checkNumberFormat(
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

exports.changeDateFormat = changeDateFormat;
