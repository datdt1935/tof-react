export class DataPush {
  id: string;
  gate: string;
  dataType: number;
  interval: number;
  protocol: number;
  url: string;
  subRows: Array<DataPush>;
}

export class DataPushDraw {
  id: string;
  gate: string;
  dataType: number;
  interval: number;
  protocol: number;
  url: string;
  detail: any;
}
