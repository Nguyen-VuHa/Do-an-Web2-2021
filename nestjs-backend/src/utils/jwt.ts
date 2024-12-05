import * as jwt from 'jsonwebtoken';

export const generateTokens = (
  payload: Record<string, any>,
  accessSecret: string,
  refreshSecret: string,
  accessExpiry = '30m', // Mặc định 30 phút
  refreshExpiry = '30d' // Mặc định 30 ngày
): { accessToken: string; refreshToken: string } => {
  // Tạo Access Token
  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: accessExpiry,
  });

  // Tạo Refresh Token
  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: refreshExpiry,
  });

  return { accessToken, refreshToken };
};
