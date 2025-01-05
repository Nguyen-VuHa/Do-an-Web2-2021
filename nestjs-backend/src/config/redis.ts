import * as dotenv from 'dotenv';
dotenv.config();

export const redisConfig = (database: number = 0): string => {
  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
  const username = process.env.REDIS_USERNAME;
  const password = process.env.REDIS_PASSWORD;

  // Tạo URL kết nối Redis thủ công
  const redisUrl = `redis://${username}:${password}@${host}:${port}/${database}`;

  return redisUrl;
};
