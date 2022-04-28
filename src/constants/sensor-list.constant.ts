export interface SensorListState {
  networks: any[];
  networkSelected: any;
  isScanning: boolean;
  sensorList: any[];
  sensorSelected: any;
  header: any[];
}

export const initialSensorListState = {
  networks: [],
  networkSelected: '',
  isScanning: false,
  sensorList: [],
  sensorSelected: null,
  header: [],
};
