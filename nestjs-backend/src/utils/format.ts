export function maskPhoneNumber(phoneNumber: string): string {
  // Kiểm tra độ dài số điện thoại
  if (phoneNumber.length < 5) {
    throw new Error('Số điện thoại không hợp lệ, cần có ít nhất 5 ký tự.');
  }
  // Che 5 số cuối
  const visiblePart = phoneNumber.slice(0, -5); // Lấy phần đầu số
  const maskedPart = '*'.repeat(5); // Thay thế 5 số cuối bằng dấu '*'
  return `${visiblePart}${maskedPart}`;
}
