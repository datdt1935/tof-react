import { Injectable } from '@nestjs/common';
import { MaskNetWork } from './networks.model';

@Injectable()
export class NetWorkService {
  maskNetWork: MaskNetWork[] = [
    new MaskNetWork(`Eht0`, '192.168.1.1', '255.255.255.0'),
    new MaskNetWork(`Eht2`, '192.168.1.1', '255.255.255.0'),
  ];

  addInterFace(): string {
    const newProdId = Math.random().toString();
    const newProduct = new MaskNetWork(
      `Eht${this.maskNetWork.length}`,
      '192.168.1.1',
      '255.255.255.0',
    );
    this.maskNetWork.push(newProduct);
    console.log(this.maskNetWork);
    return newProdId;
  }
  getAllMaskNet(): MaskNetWork[] {
    return this.maskNetWork;
  }
}
