export function stringToInt(str: string): number {
  const result = parseInt(str, 10); // 10 là hệ thập phân
  return isNaN(result) ? 0 : result; // Kiểm tra nếu kết quả không phải là số
}

export const convertURLToBlob = async (url: string) => {
  const response = await fetch(url); // Tải dữ liệu từ URL
  const blob = await response.blob(); // Chuyển đổi thành Blob
  return blob;
};

export function base64ToFileWithMime(
  base64String: string,
  fileName: string,
): File {
  // Trích xuất mime type từ chuỗi base64
  const mimeTypeMatch = base64String.match(/data:([a-zA-Z0-9-+\/.]+);base64,/);
  if (!mimeTypeMatch || !mimeTypeMatch[1]) {
    throw new Error('Không thể xác định mime type từ base64');
  }

  const mimeType = mimeTypeMatch[1];

  // Lấy phần dữ liệu base64 (sau dấu ",")
  const base64Data = base64String.split(',')[1];

  // Chuyển đổi base64 thành mảng các byte
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Tạo Blob với mime type và dữ liệu
  const blob = new Blob(byteArrays, { type: mimeType });

  // Tạo File từ Blob và trả về
  return new File([blob], removeDiacriticsAndToLowerCase(fileName), {
    type: mimeType,
  });
}

function removeDiacriticsAndToLowerCase(str: string): string {
  const from =
    'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ'.split(
      '',
    );
  const to = 'aaaaaaaaaaaaaaaaaeaeaeaeiiiooooooooooooooouuuuuuuuuuyyydD'.split(
    '',
  );

  // Bỏ dấu và chuyển thành chữ thường
  let result = str.toLowerCase();
  for (let i = 0; i < from.length; i++) {
    result = result.replace(new RegExp(from[i], 'g'), to[i]);
  }

  // Thay dấu cách bằng dấu gạch ngang
  result = result.replace(/\s+/g, '-');

  return result;
}

export function convertToSlug(str: string): string {
  return str
    .toLowerCase() // Chuyển tất cả thành chữ thường
    .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt, chỉ giữ chữ cái, số và khoảng trắng
    .replace(/\s+/g, '-') // Thay thế khoảng trắng thành dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ các dấu gạch ngang dư thừa
    .replace(/^-+/, ''); // Loại bỏ dấu gạch ngang ở đầu chuỗi
}
