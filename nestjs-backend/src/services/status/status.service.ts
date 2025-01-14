import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class StatusService {
  private readonly userStatusSubjects = new Map<string, Subject<any>>();

  getOrCreateSubject(uniqueKey: string): Subject<any> {
    if (!this.userStatusSubjects.has(uniqueKey)) {
      this.userStatusSubjects.set(uniqueKey, new Subject());
    }
    const subject = this.userStatusSubjects.get(uniqueKey);

    // Đảm bảo rằng dữ liệu luôn được định dạng đúng trước khi truyền tới Observable
    const formattedSubject = new Subject<any>();
    subject.subscribe((data) => {
      formattedSubject.next({
        data: JSON.stringify(data), // Định dạng JSON
      });
    });

    return formattedSubject;
  }

  sendStatus(uniqueKey: string, data: any): void {
    const subject = this.userStatusSubjects.get(uniqueKey);

    if (subject) {
      subject.next({ data });
    } else {
      console.error(`No subject found for uniqueKey: ${uniqueKey}`);
    }
  }
}
