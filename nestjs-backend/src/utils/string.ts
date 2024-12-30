export function getInitialsChar(input: string): string {
  return input
    .trim() // Loại bỏ khoảng trắng đầu/cuối
    .split(/\s+/) // Tách chuỗi thành các từ dựa trên khoảng trắng
    .map((word) => word[0]?.toUpperCase() || '') // Lấy ký tự đầu và chuyển thành in hoa
    .join('') // Ghép các ký tự đầu lại
    .toUpperCase(); // Đảm bảo toàn bộ chuỗi là chữ in hoa
}
