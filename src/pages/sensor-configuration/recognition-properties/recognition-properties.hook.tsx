<<<<<<< Updated upstream
import { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
=======
import { useEffect, useRef, useState } from 'react';
>>>>>>> Stashed changes

import {
  BackgroundType,
  drawTypeOptions,
  initialRecognitionPropertiesState,
  RecognitionPropertiesState,
} from 'constants/recognition-properties.constant';

import { useMediaQuery, useTheme } from '@material-ui/core';
import { cloneDeep, find, get, omit, set } from 'lodash';
import { networkService } from '../../../api';
import { useDispatch } from 'react-redux';
import { setComboBoxOptions } from 'store/action/action';
import {
  ColumnDataType,
  HeaderTableProps,
} from 'components/table/table.constant';
import produce from 'immer';
import { guid } from '../canvas/image-canvas.util';

const useRecognitionPropertiesHook = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
<<<<<<< Updated upstream
  const [state, setState] = useState<RecognitionPropertiesState>(
    initialRecognitionPropertiesState
  );
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
=======

  const [drawType, setDrawType] = useState<DrawType>(DrawType.ZoneFloor);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(
    BackgroundType.Image
  );
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [dataDraw, setDataDraw] = useState<any>();
  const [gateName, setGateName] = useState<string>('');
>>>>>>> Stashed changes

  const setDrawType = (drawType: any) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        draft.drawType = drawType;
      })
    );
  };

  const setBackgroundType = (backgroundType: BackgroundType) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        draft.backgroundType = backgroundType;
      })
    );
  };

  const setDataDraw = (dataDraw: any) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        draft.dataDraw = dataDraw;
      })
    );
  };

  const setGateName = (value: string) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        draft.gateName = value;
      })
    );
  };

  const removeRow = (rowIndex: number) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        const item = draft.data[rowIndex];
        if (!item) return;

        (canvasRef.current as any).removePolyObject(
          get(item, 'detail.polyName')
        );
        draft.data.splice(rowIndex, 1);
      })
    );
  };

  const copyRow = (rowIndex: number) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        const item = cloneDeep(draft.data[rowIndex]);
        if (!item) return;
        item.id = null;
        item.gate += '_copy';
        item.isCreated = true;
        draft.data.splice(rowIndex + 1, 0, item);
      })
    );
  };

  const initSensorDetail = useCallback(
    (isRefresh?: boolean) => {
      networkService.networkControllerGetSingleGate().then((res: any) => {
        dispatch(
          setComboBoxOptions({ ...res.data.options, drawType: drawTypeOptions })
        );

        //
        const columns: HeaderTableProps[] = res.data.columns || [];
        const data = get(res, 'data.data') || [];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const polyName = get(data, [key, 'detail', 'polyName']) || guid();
            const points = get(data, [key, 'detail', 'points']);
            set(
              data,
              [key, 'detail', 'points'],
              points.map((_p: any) => new fabric.Point(_p.x, _p.y))
            );
            set(data, [key, 'detail', 'polyName'], polyName);
          }
        }

        columns.push({
          columnHeader: 'Action',
          columnName: '',
          columnType: ColumnDataType.ACTION,
          actions: [
            {
              faIcon: 'fal fa-copy',
              onClick: copyRow,
            },
            {
              faIcon: 'fal fa-trash',
              onClick: removeRow,
            },
          ],
        });

        setState(
          produce((draft: RecognitionPropertiesState) => {
            draft.data = data;
            draft.columns = columns;
          })
        );
        if (isRefresh) (canvasRef.current as any).reCalculateCanvas();
        (canvasRef.current as any).createPolyObject(data);
      });
    },
    [dispatch]
  );

  useEffect(() => {
<<<<<<< Updated upstream
    initSensorDetail();
  }, [initSensorDetail]);

  const onDataChange = ({ rowIndex, columnName, value }: any) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        draft.data[rowIndex][columnName] = value;
      })
    );
  };

  const generateEmptyData = (option: any) => {
    const response: any = {};
    for (const key in state.columns) {
      if (Object.prototype.hasOwnProperty.call(state.columns, key)) {
        const column: HeaderTableProps = state.columns[key];
        if (get(column, 'columnSetting.hidden')) continue;
        response[column.columnName] = '';
      }
    }
    return Object.assign(response, option);
  };

  const addNewGate = () => {
    const response: any = generateEmptyData({
      isCreate: true,
      gate: state.gateName,
      detail: state.dataDraw,
=======
    networkService.networkControllerGetGates().then((res: any) => {
      dispatch(setComboBoxOptions(res.data.options));
      setData(res.data.data || []);
      setColumns(res.data.columns || []);
      (canvasRef.current as any).createPolyObject(res.data.data);
>>>>>>> Stashed changes
    });

    (canvasRef.current as any).updateObjectByPolyName(state.dataDraw.polyName, {
      isCreated: true,
    });
    setState(
      produce((draft: RecognitionPropertiesState) => {
        draft.data.push(response);
        draft.dataDraw = null;
        draft.gateName = '';
      })
    );
  };

<<<<<<< Updated upstream
  const updateObjectProps = (data: any) => {
    setState(
      produce((draft: RecognitionPropertiesState) => {
        const item: any = find(draft.data, ['id', data.id]);
        if (!item) return;
        item.detail = omit(data, ['id']);
      })
    );
  };

  const reloadPage = () => {
    (canvasRef.current as any).clearAll();
    initSensorDetail(true);
  };

  const saveGates = () => {
    console.log(state.data);
  };
=======
    const response = cloneDeep(data[0]);
    response.id = guid();
    response.gate = gateName;
    response.detail = cloneDeep(dataDraw);
    const currentTable = cloneDeep(data);
    currentTable.push(response);

    setData(currentTable);

    setDataDraw(null);
    setGateName('');
  };

  const updateObjectProps = async () => {};

  return {
    canvasRef,

    gateName,
    setGateName,
    drawType,
    setDrawType,
>>>>>>> Stashed changes

  return {
    ...state,
    canvasRef,
    fullScreen,

    setGateName,
    setDrawType,
    setDataDraw,
    setBackgroundType,
<<<<<<< Updated upstream
    onDataChange,
    addNewGate,
    updateObjectProps,
    reloadPage,
    saveGates,
=======

    saveObject,
    updateObjectProps,

    data,
    columns,
>>>>>>> Stashed changes
  };
};

export default useRecognitionPropertiesHook;
