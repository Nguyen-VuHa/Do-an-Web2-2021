import * as dayjs from 'dayjs';

function stringToDate(dateStr: string): Date {
  if (!dayjs(dateStr).isValid()) {
    return new Date();
  } else {
    const date = dayjs(dateStr).toDate();
    console.log(date);
  }
}

export { stringToDate };
