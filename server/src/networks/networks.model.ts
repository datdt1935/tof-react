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

export class SensorItem {
  constructor(
    Iid: string,
    Ihost: string,
    productVariation: string,
    Iserial: string,
    Imac: string,
    Iip: string,
  ) {
    this.id = Iid;
    this.host = Ihost;
    this.productVariation = productVariation;
    this.serial = Iserial;
    this.mac = Imac;
    this.ip = Iip;
  }
  @ApiProperty()
  id: string;
  @ApiProperty()
  host: string;
  @ApiProperty()
  productVariation: string;
  @ApiProperty()
  serial: string;
  @ApiProperty()
  mac: string;
  @ApiProperty()
  ip: string;
}
