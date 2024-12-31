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

export function base64ToBlob(dataUrl: string): Blob {
  // Tách phần Base64 (nếu có tiền tố)
  const [prefix, base64] = dataUrl.includes(',')
    ? dataUrl.split(',')
    : [null, dataUrl];

  // Kiểm tra MIME type từ tiền tố (nếu có)
  const mimeType = prefix?.match(/:(.*?);/)?.[1] || 'application/octet-stream';

  // Đảm bảo chuỗi Base64 không chứa ký tự không hợp lệ và có độ dài bội số của 4
  const cleanedBase64 = base64.trim().replace(/[^A-Za-z0-9+/=]/g, '');
  const paddedBase64 = cleanedBase64.padEnd(
    Math.ceil(cleanedBase64.length / 4) * 4,
    '=',
  );

  // Chuyển đổi Base64 thành Blob
  const byteCharacters = atob(paddedBase64);
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const formatVND = (money: string) => {
  return money?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
