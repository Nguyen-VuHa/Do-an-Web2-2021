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

function convertToSlug(str: string): string {
  const strClean = removeVietnameseAccents(str.toLowerCase());

  return strClean
    .toLowerCase() // Chuyển tất cả thành chữ thường
    .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt, chỉ giữ chữ cái, số và khoảng trắng
    .replace(/\s+/g, '-') // Thay thế khoảng trắng thành dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ các dấu gạch ngang dư thừa
    .replace(/^-+/, ''); // Loại bỏ dấu gạch ngang ở đầu chuỗi
}

function removeVietnameseAccents(str: string): string {
  const accents = [
    { base: 'a', letters: /á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g },
    { base: 'e', letters: /é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g },
    { base: 'i', letters: /í|ì|ỉ|ĩ|ị/g },
    { base: 'o', letters: /ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g },
    { base: 'u', letters: /ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g },
    { base: 'y', letters: /ý|ỳ|ỷ|ỹ|ỵ/g },
    { base: 'd', letters: /đ/g },
  ];

  accents.forEach(({ base, letters }) => {
    str = str.replace(letters, base);
  });

  return str;
}

function mapTimeToToday(time: string): Date | null {
  const [hours, minutes] = time.split(':').map(Number); // Tách giờ và phút từ chuỗi
  if (isNaN(hours) || isNaN(minutes)) {
    return null;
  }

  const now = new Date(); // Lấy ngày hiện tại
  now.setHours(hours, minutes, 0, 0); // Đặt giờ, phút, giây và mili-giây
  return now;
}

export { stringToDate, stringToInt, convertToSlug, mapTimeToToday, removeVietnameseAccents };
