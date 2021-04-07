import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello() + 'DAT';
  }

  @Get('data')
  @Header('Content-Type', 'text/html')
  gettestdata() {
    return 3;
  }
}
