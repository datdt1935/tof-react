import { ApiProperty } from '@nestjs/swagger';
export class Gate {
  @ApiProperty()
  chanel: number;
  @ApiProperty()
  detail: GateDetail;
  @ApiProperty()
  gate: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  minObject: number;
  @ApiProperty()
  threshold: number;
  @ApiProperty()
  url: string;
}

export interface GateDetail {
  points: Array<any>;
  drawType: string;
  stroke: string;
  fill: string;
  strokeWidth: number;
  name: string;
}

// export class GateDetail {
//   @ApiProperty()
//   points: Array<any>;
//   @ApiProperty()
//   drawType: string;
//   @ApiProperty()
//   stroke: string;
//   @ApiProperty()
//   fill: string;
//   @ApiProperty()
//   strokeWidth: number;
//   @ApiProperty()
//   name: string;
// }
