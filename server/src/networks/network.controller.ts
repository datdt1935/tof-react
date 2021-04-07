import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { NetWorkService } from './network.service';
@ApiTags('Network API')
@Controller('networks')
export class NetworkController {
  constructor(private readonly productService: NetWorkService) {}
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  addProduct(): any {
    this.productService.addInterFace();
    return this.productService.getAllMaskNet().length;
  }
  @Get()
  @ApiCreatedResponse({
    description: 'You got alls.',
  })
  getAll() {
    return this.productService.getAllMaskNet();
  }
}
