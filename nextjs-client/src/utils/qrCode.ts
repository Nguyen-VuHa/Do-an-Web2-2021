import QRCode from 'qrcode';

export async function generateQRCode(codeStr: string): Promise<string> {
  try {
    const url = await QRCode.toDataURL(codeStr, {
      color: {
        dark: "#000000", // Màu mã QR
        light: "#ffffff", // Màu nền
      },
    });
    return url;
  } catch (err) {
    console.error("Error creating QR code:", err);
    return '';
  }
}
