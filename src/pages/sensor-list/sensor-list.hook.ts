import { useEffect, useState } from 'react';
import { networkService } from 'api';
import { differenceWith, get, isEqual } from 'lodash';
import { useDispatch } from 'react-redux';
import { pushWarningMessage } from 'store/action/notification.action';

import {
  SensorListState,
  initialSensorListState,
} from 'constants/sensor-list.constant';
import produce from 'immer';

var intervalTime: any;
const useSensorListHook = () => {
<<<<<<< Updated upstream
  const dispatch = useDispatch();
=======
  const [networks, setNetworks] = useState<any>([]);
  const [networkSelected, setNetworkSelected] = useState<any>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
>>>>>>> Stashed changes

  const [state, setState] = useState<SensorListState>(initialSensorListState);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await networkService.networkControllerGetAll();
      setState(
        produce((draft: SensorListState) => {
          draft.networks = response.data || [];
        })
      );
    }
    fetchMyAPI();

    return () => {
      if (intervalTime) clearInterval(intervalTime);
      const ipcRenderer = (window as any).electron?.ipcRenderer;
      if (ipcRenderer)
        ipcRenderer.invoke('resetMDNS', null).then((result: Array<any>) => {});
    };
  }, []);

  const getIntervalData = () => {
    const ipcRenderer = (window as any).electron.ipcRenderer;
    ipcRenderer.invoke('mdnsFetch', null).then((result: Array<any>) => {
      const newRequest = differenceWith(result, state.sensorList, isEqual);
      if (!newRequest.length) return;
      console.log(
        '🚀 ~ file: sensor-list.hook.ts ~ line 46 ~ ipcRenderer.invoke ~ newRequest',
        newRequest
      );

      setState(
        produce((draft: SensorListState) => {
          draft.sensorList.concat(newRequest);
        })
      );
    });
  };

  const scanSensor = () => {
    if (state.isScanning) return;

    const ipcRenderer = (window as any).electron?.ipcRenderer;
    if (!ipcRenderer) {
      dispatch(
        pushWarningMessage(
          'Device scanning is not available in web application currently.'
        )
      );
      return;
    }
    setState(
      produce((draft: SensorListState) => {
        draft.isScanning = true;
      })
    );
    ipcRenderer.invoke('startMDNS', null).then((result: any) => {});
    intervalTime = setInterval(() => {
      getIntervalData();
    }, 1000);
  };

  const stopScanning = () => {
    setState(
      produce((draft: SensorListState) => {
        draft.isScanning = false;
      })
    );
    if (intervalTime) clearInterval(intervalTime);
  };

  const selectNetwork = (data: any) => {
    networkService.networkControllerGetSensors().then((res: any) => {
      setState(
        produce((draft: SensorListState) => {
          draft.networkSelected = data;
          draft.header = get(res, 'data.columns') || [];
          draft.sensorList = get(res, 'data.data') || [];
        })
      );
    });
  };

  const onRowSelected = (row: any) => {};

  return {
    ...state,
    selectNetwork,

    scanSensor,
    stopScanning,

    onRowSelected,
  };
};

export default useSensorListHook;
