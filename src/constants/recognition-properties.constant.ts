export enum DrawType {
  LineIn = 'Line in',
  LineOut = 'Line out',
  LineInAndOut = 'Line in/out',
  ZoneFloor = 'Floor',
  ZoneExclusion = 'Exclusion',
  ZoneMark = 'Mark',
}

export enum BackgroundType {
  Image = 1,
  Video = 2,
}

export interface RecognitionPropertiesState {
  drawType: DrawType;
  backgroundType: BackgroundType;
  dataDraw: any;
  gateName: string;
  data: any[];
  columns: any[];
}

export const initialRecognitionPropertiesState: RecognitionPropertiesState = {
  backgroundType: BackgroundType.Image,
  drawType: DrawType.LineIn,
  dataDraw: null,
  gateName: '',
  data: [],
  columns: [],
};

export const drawTypeOptions = [
  {
    textValue: DrawType.LineIn,
    idValue: DrawType.LineIn,
  },
  {
    textValue: DrawType.LineOut,
    idValue: DrawType.LineOut,
  },
  {
    textValue: DrawType.LineInAndOut,
    idValue: DrawType.LineInAndOut,
  },
  {
    textValue: DrawType.ZoneFloor,
    idValue: DrawType.ZoneFloor,
  },
  {
    textValue: DrawType.ZoneExclusion,
    idValue: DrawType.ZoneExclusion,
  },
  {
    textValue: DrawType.ZoneMark,
    idValue: DrawType.ZoneMark,
  },
];
