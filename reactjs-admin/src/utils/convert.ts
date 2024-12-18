export function stringToInt(str: string): number {
  const result = parseInt(str, 10); // 10 là hệ thập phân
  return isNaN(result) ? 0 : result; // Kiểm tra nếu kết quả không phải là số
}

export const convertURLToBlob = async (url: string) => {
  const response = await fetch(url); // Tải dữ liệu từ URL
  const blob = await response.blob(); // Chuyển đổi thành Blob
  return blob;
};
