import { Module } from '@nestjs/common';
import { NetworkController } from './network.controller';
import { NetWorkService } from './network.service';

@Module({
  controllers: [NetworkController],
  providers: [NetWorkService],
})
export class NetWorkModule {}
