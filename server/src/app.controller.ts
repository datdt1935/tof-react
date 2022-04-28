import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('isRunning')
  getHello(): string {
    return this.appService.checkRunning();
  }
}
