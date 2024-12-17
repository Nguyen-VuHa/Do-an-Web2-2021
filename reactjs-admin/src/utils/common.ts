export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024; // Đơn vị chuyển đổi
  const i = Math.floor(Math.log(bytes) / Math.log(k)); // Xác định đơn vị phù hợp

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${units[i]}`; // Làm tròn 2 chữ số
}
