import { Controller, Injectable, Param, Query, Scope, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IBookingStatus } from 'src/core/types/booking.type';
import { StatusService } from 'src/services/status/status.service';

@Injectable({ scope: Scope.DEFAULT })
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Sse('events/booking/:user_id')
  sendUserStatus(
    @Query() query: IBookingStatus,
    @Param('user_id') user_id: string
  ): Observable<any> {
    // Kết hợp userId và token để tạo khóa duy nhất cho mỗi kết nối
    const uniqueKey = `${user_id}-${query.showtime_id}-${query.token}`;
    return this.statusService.getOrCreateSubject(uniqueKey).asObservable();
  }
}
