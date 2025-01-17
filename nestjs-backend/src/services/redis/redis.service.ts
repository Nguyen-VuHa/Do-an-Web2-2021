import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
import { redisConfig } from 'src/config/redis';
import { IObject } from 'src/core/types/common';

@Injectable()
export class RedisService {
  private client: RedisClientType;
  private redisConfig = redisConfig();
  private isRedisConnected = false;

  async onModuleInit() {
    this.client = createClient({
      url: this.redisConfig,
      socket: {
        connectTimeout: 1000, // Thiết lập thời gian timeout kết nối
        reconnectStrategy: () => {
          // Ngừng reconnect nếu không kết nối được
          // gửi mail báo cho IT xử lý
          console.error('Redis Client Error: Unable to connect, not retrying');
          return false; // Không reconnect
        },
      },
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    try {
      await this.client.connect(); // Kết nối khi khởi tạo module
      console.log('Connected to Redis');
      this.isRedisConnected = true;
    } catch (err) {
      console.error('Failed to connect to Redis:', err);
      this.isRedisConnected = false;
    }
  }

  async onModuleDestroy() {
    if (this.client.isOpen) {
      await this.client.quit(); // Đảm bảo đóng kết nối khi module bị hủy
      console.log('Redis connection closed');
    }
  }
  async setDataRedis(
    key: string,
    data: IObject<any> | string,
    TTLSeconds?: number
  ): Promise<boolean> {
    if (!this.isRedisConnected) {
      return false; // Trả về null nếu Redis không kết nối
    }

    try {
      // Kiểm tra xem ttlSeconds có được truyền vào không
      const setOptions: { EX?: number } = {};

      if (TTLSeconds) {
        setOptions.EX = TTLSeconds; // Nếu có thời gian TTL, set EX
      }

      // Sử dụng Promise để xử lý việc lưu trữ dữ liệu
      const result = await this.client.set(key, JSON.stringify(data), setOptions);

      if (result === 'OK') {
        return true; // Thành công
      } else {
        return false; // Nếu kết quả không phải 'OK', trả về false
      }
    } catch (err) {
      console.error('Redis connection failed:', err);
      // Nếu kết nối thất bại, trả về false
      return false;
    }
  }

  async getDataRedis<T>(key: string): Promise<T | null> {
    if (!this.isRedisConnected) {
      return null; // Trả về null nếu Redis không kết nối
    }

    try {
      // Lấy dữ liệu từ Redis
      const data = await this.client.get(key);

      if (data) {
        try {
          // Parse dữ liệu JSON nếu có
          const parsedData: T = JSON.parse(data);
          return parsedData;
        } catch (err) {
          console.error('Error parsing data:', err);
          return null; // Nếu có lỗi khi parse, trả về null
        }
      } else {
        return null; // Nếu không tìm thấy dữ liệu trong Redis, trả về null
      }
    } catch (err) {
      console.error('Error occurred while getting data from Redis:', err);
      return null; // Nếu có lỗi khi kết nối hoặc lấy dữ liệu, trả về null
    }
  }
}
