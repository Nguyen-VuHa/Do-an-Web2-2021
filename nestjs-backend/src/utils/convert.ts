import * as dayjs from 'dayjs';

function stringToDate(dateStr: string): Date {
  if (!dayjs(dateStr).isValid()) {
    return new Date();
  } else {
    const date = dayjs(dateStr).toDate();
    return date;
  }
}

function stringToInt(str: string): number {
  const result = parseInt(str, 10); // Cơ sở số 10
  if (isNaN(result)) {
    return 0;
  }
  return result;
}

export { stringToDate, stringToInt };
