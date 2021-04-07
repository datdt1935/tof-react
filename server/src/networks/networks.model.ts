import { ApiProperty } from '@nestjs/swagger';

export class MaskNetWork {
  constructor(interfaceI: string, ip: string, dns: string) {
    this.interface = interfaceI;
    this.ip = ip;
    this.dns = dns;
  }
  @ApiProperty()
  interface: string;
  @ApiProperty()
  ip: string;
  @ApiProperty()
  dns: string;
}
