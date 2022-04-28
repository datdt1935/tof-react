import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkRunning(): string {
    return 'Fine!';
  }
}
