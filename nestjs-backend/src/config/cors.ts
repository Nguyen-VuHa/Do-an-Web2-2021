export const corsConfig = {
  origin: ['http://localhost:4000'], // Chỉ cho phép nguồn gốc này truy cập
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức được phép
  allowedHeaders: 'Content-Type, Authorization', // Các header cho phép
  credentials: true, // Nếu bạn cần gửi cookies hoặc thông tin xác thực
};
