export function base64ToBlob(dataUrl: string): Blob {
  // Tách phần Base64 (nếu có tiền tố)
  const [prefix, base64] = dataUrl.includes(",")
    ? dataUrl.split(",")
    : [null, dataUrl];

  // Kiểm tra MIME type từ tiền tố (nếu có)
  const mimeType = prefix?.match(/:(.*?);/)?.[1] || "application/octet-stream";

  // Đảm bảo chuỗi Base64 không chứa ký tự không hợp lệ và có độ dài bội số của 4
  const cleanedBase64 = base64.trim().replace(/[^A-Za-z0-9+/=]/g, "");
  const paddedBase64 = cleanedBase64.padEnd(
    Math.ceil(cleanedBase64.length / 4) * 4,
    "=",
  );

  // Chuyển đổi Base64 thành Blob
  const byteCharacters = atob(paddedBase64);
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export const convertURLToBlob = async (url: string) => {
  const response = await fetch(url); // Tải dữ liệu từ URL
  const blob = await response.blob(); // Chuyển đổi thành Blob
  return blob;
};
