import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { Multer } from 'multer';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const { cloud_name, api_key, api_secret } = cloudinaryConfig(this.configService);

    // Cấu hình Cloudinary
    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
    });
  }

  async uploadFile(file: Multer.File): Promise<UploadApiResponse> {
    try {
      // Trả về một Promise từ Cloudinary upload stream
      const result = await new Promise<any>((resolve, reject) => {
        // Tạo stream từ file buffer
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto', // Cloudinary tự nhận diện loại file
            folder: 'file-system',
          },
          (error, result) => {
            if (error) {
              reject(error); // Trả về lỗi nếu có
            } else {
              resolve(result); // Trả về kết quả upload
            }
          }
        );

        // Đẩy file vào stream
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      // Trả về kết quả upload nếu thành công
      return result;
    } catch (error) {
      // Xử lý lỗi nếu có
      throw new Error('Error uploading to Cloudinary: ' + error.message);
    }
  }
}
