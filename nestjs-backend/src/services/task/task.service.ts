import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosInstance } from 'axios';
import { SmartCreateShowtimeDTO } from 'src/core/dtos/admin-showtime.dto';
import { AdminShowtimeUseCases } from 'src/use-cases/(admin)/showtime/showtime.usecase';

@Injectable()
export class TaskService {
  constructor(
    @Inject('AXIOS_CRAWLER') private readonly axiosCrawler: AxiosInstance,
    private readonly adminShowtimeUseCase: AdminShowtimeUseCases
  ) {}
  private isCrawler: boolean = false;

  // chạy cron job mỗi 1h sáng hàng ngày để tạo showtime
  @Cron('0 1 * * *')
  async handleCrawlerShowtime() {
    console.log('⏰ Đã đến 1h sáng! bắt đầu chạy cron job');
    if (this.isCrawler) return;
    try {
      this.isCrawler = true;
      const urlFilm = 'https://www.bhdstar.vn/phim';
      const { data } = await this.axiosCrawler.get(`api/crawl-showtime-data?_url=${urlFilm}`);

      if (data.data && data.data.length > 0) {
        for await (const dataShowtime of data.data) {
          await this.adminShowtimeUseCase.smartCreateShowtime(
            dataShowtime as SmartCreateShowtimeDTO
          );
        }
      }
    } catch (error) {
      console.error('🔥 Lỗi AggregateError:', error);
      if (error.errors) {
        error.errors.forEach((e, i) => console.error(`❌ Lỗi [${i}]:`, e.message));
      }
    } finally {
      console.log('⏰ Kết thúc chạy cron job');
      this.isCrawler = false;
    }
  }
}
