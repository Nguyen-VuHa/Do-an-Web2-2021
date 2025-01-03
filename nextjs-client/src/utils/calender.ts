export function getMonthCalendar(
  year: number,
  month: number,
): (number | null)[][] {
  const lastDayOfMonth = new Date(year, month, 0);
  const totalDays = lastDayOfMonth.getDate();

  const monthCalendar: (number | null)[][] = [];
  let week: (number | null)[] = new Array(7).fill(null); // Tạo một tuần rỗng

  for (let day = 1; day <= totalDays; day++) {
    const currentDate = new Date(year, month - 1, day);

    const dayOfWeek = (currentDate.getDay() + 6) % 7; // Điều chỉnh để Thứ Hai là ngày đầu tuần
    week[dayOfWeek] = day;

    if (dayOfWeek === 6 || day === totalDays) {
      monthCalendar.push(week);
      week = new Array(7).fill(null); // Tạo một tuần mới
    }
  }

  return monthCalendar;
}

export function generateYears(
  startYear: number,
  endYear: number,
): { value: number; name: string }[] {
  const years: { value: number; name: string }[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, name: `${year}` });
  }
  return years;
}
