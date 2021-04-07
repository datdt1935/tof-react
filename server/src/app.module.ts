import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NetWorkModule } from './networks/network.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, NetWorkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
