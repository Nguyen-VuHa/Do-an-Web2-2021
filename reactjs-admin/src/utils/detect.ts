export function getFileType(mimeType: string) {
  const fileTypes = {
    image: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
      'image/x-icon',
    ],
    excel: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    word: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    powerpoint: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    json: ['application/json'],
    javascript: ['application/javascript'],
    pdf: ['application/pdf'],
    html: ['text/html'],
    css: ['text/css'],
    audio: ['audio/mpeg'],
    mp4: ['video/mp4'],
  };

  // Kiểm tra loại file dựa vào MIME type
  for (const [type, mimeList] of Object.entries(fileTypes)) {
    if (mimeList.includes(mimeType)) {
      return type; // Trả về loại file (image, excel, json, ...)
    }
  }

  return 'unknown'; // Không xác định
}
