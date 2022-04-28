import { networkService } from '../../../api';
import { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { get, omit } from 'lodash';

import {
  DataPushState,
  initialDataPushState,
} from 'constants/data-push.constant';
import produce from 'immer';

const useDataPushHook = (isActive: boolean) => {
  const [state, setState] = useState<DataPushState>(initialDataPushState);

  var addNewData = (index: number, item: any) => {
    setState(
      produce((draft: DataPushState) => {
        const row = draft.data[index];
        if (!row) return;
        row.subRows.push(omit(item, ['id', 'subRows']));
      })
    );
  };

  useEffect(() => {
    if (!isActive) return;
    networkService.networkControllerGetDataPush().then((res: any) => {
      setState(
        produce((draft: DataPushState) => {
          draft.data = get(res, 'data.data') || [];
          draft.columns = get(res, 'data.columns') || [];
        })
      );
    });
  }, [isActive]);
  return { ...state, addNewData };
=======
import { get } from 'lodash';

const useDataPushHook = (isActive: boolean) => {
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    if (!isActive) return;
    networkService.networkControllerGetGates().then((res: any) => {
      setData(get(res, 'data.data') || []);
      setColumns(get(res, 'data.columns') || []);
    });
  }, [isActive]);
  return { data, columns };
>>>>>>> Stashed changes
};

export default useDataPushHook;
