export function stringToInt(str: string): number {
  const result = parseInt(str, 10); // 10 là hệ thập phân
  return isNaN(result) ? 0 : result; // Kiểm tra nếu kết quả không phải là số
}
