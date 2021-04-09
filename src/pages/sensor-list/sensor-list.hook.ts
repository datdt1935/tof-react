import { networkService } from 'api';
import { useEffect, useState } from 'react';
import { generateHeader } from './sensor.uti';

const useSensorListHook = () => {
  const [networks, setNetworks] = useState<any>([]);
  const [networkSelected, setNetworkSelected] = useState<any>({});
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const [sensorList, setSensorList] = useState<any>([]);
  const [header, setHeader] = useState<any>([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await networkService.networkControllerGetAll();
      setNetworks(response.data);
    }
    fetchMyAPI();
  }, []);

  const scanSensor = () => {
    if (isScanning) return;
    setIsScanning(true);
    const ipcRenderer = (window as any).electron.ipcRenderer;
    ipcRenderer.invoke('scanLocalIP', null).then((result: Array<any>) => {
      console.log('data', result);
      setIsScanning(false);
      setHeader(generateHeader(result[0]));
      setSensorList(result);
    });
  };

  return {
    networks,
    networkSelected,
    setNetworkSelected,

    scanSensor,

    isScanning,
    sensorList,
    header,
  };
};

export default useSensorListHook;
