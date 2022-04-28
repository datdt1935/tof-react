import { Injectable } from '@nestjs/common';
import { IDataRow } from 'src/interfaces/IDataTable';
import { DataRowResponse } from 'src/models/DataRowResponse';
import { MaskNetWork, SensorItem } from './networks.model';
import { add, extend, findIndex } from 'lodash';
import { Gate } from 'src/models/Gate';
import { DataPush, DataPushDraw } from 'src/models/DataPush';
import { v4 as uuidv4 } from 'uuid';
let sensorsMock: Array<Gate> = [
  {
    id: `fedd240a-6561-ab12-17b0-54b8c1eb44fa`,
    gate: `Gate 1`,
    threshold: 1000,
    minObject: 2,
    chanel: 11151513,
    url: `http://api.com:5001`,
    detail: {
      points: [
        { x: 1654.975338302847, y: 1063.0691225165563 },
        { x: 3720.968063855665, y: 1057.4813741721855 },
        { x: 3570.2064325315405, y: 2437.655215231788 },
        { x: 1453.9598298706806, y: 2370.602235099338 },
        { x: 1453.9598298706806, y: 2370.602235099338 },
      ],
      drawType: 'Floor',
      stroke: '#D20013',
      fill: '#D2001320',
      strokeWidth: 6,
      name: 'a1',
    },
  },
  {
    id: `312a06a7-98bf-398c-be51-b1faec94cc63`,
    gate: `Gate 2`,
    threshold: 1545,
    minObject: 2,
    chanel: 111111,
    url: `http://api.com:5011`,
    detail: {
      points: [
        { x: 1027.4925306473078, y: 1011.1053719008263 },
        { x: 1033.0682065809542, y: 1574.535123966942 },
        { x: 1033.0682065809542, y: 1580.1136363636363 },
      ],
      drawType: 'Floor',
      stroke: '#D20013',
      fill: '#D2001320',
      strokeWidth: 6,
      name: 'a1',
    },
  },
  {
    id: `24b2bdbc-1821-8366-07a2-9fc0556a5cf1`,
    gate: `Gate 3`,
    threshold: 5000,
    minObject: 2,
    chanel: 1000,
    url: `http://api.com:5023`,
    detail: {
      points: [
        { x: 4395.200794569839, y: 168.75 },
        { x: 4395.200794569839, y: 2294.1632231404956 }
      ],
      drawType: 'LineInAndOut',
      stroke: '#D20013',
      fill: '#D2001320',
      strokeWidth: 6,
      name: 'a1',
    },
  },
];

@Injectable()
export class NetWorkService {
  maskNetWork: MaskNetWork[] = [
    new MaskNetWork(`Eht0`, '192.168.1.1', '255.255.255.0'),
    new MaskNetWork(`Eht2`, '192.168.1.1', '255.255.255.0'),
  ];

  addInterFace(): string {
    const newProdId = Math.random().toString();
    const newProduct = new MaskNetWork(
      `Eht${this.maskNetWork.length}`,
      '192.168.1.1',
      '255.255.255.0',
    );
    this.maskNetWork.push(newProduct);
    console.log(this.maskNetWork);
    return newProdId;
  }
  getAllMaskNet(): MaskNetWork[] {
    return this.maskNetWork;
  }

  // For route : /
  getSensors(): DataRowResponse<any> {
    var result: DataRowResponse<any> = new DataRowResponse();
    result.data = [];
    for (var i = 0; i < 15; i++) {
      result.data.push(
        new SensorItem(
          `id${i}`,
          `192.168.1.${i}`,
          `GOOGLE Device ${i}`,
          `Serial_${i}`,
          `${i}MAC`,
          `${i}-IP`,
        ),
      );
    }

    result.columns = [
      {
        columnHeader: 'Host',
        columnName: 'host',
        columnType: 'input',
        columnSetting: {
          readonly: true,
          hidden: false,
        },
      },
      {
        columnHeader: 'Product Variation',
        columnName: 'productVariation',
        columnType: 'input',
        columnSetting: {
          readonly: true,
          hidden: false,
        },
      },
      {
        columnHeader: 'Serial#',
        columnName: 'serial',
        columnType: 'input',
        columnSetting: {
          readonly: true,
          hidden: false,
        },
      },
      {
        columnHeader: 'MAC',
        columnName: 'mac',
        columnType: 'input',
        columnSetting: {
          readonly: true,
          hidden: false,
        },
      },
      {
        columnHeader: 'IP Address',
        columnName: 'ip',
        columnType: 'input',
        columnSetting: {
          readonly: true,
          hidden: false,
        },
      },
    ];

    return result;
  }

  getAllGates(): DataRowResponse<DataPushDraw> {
    var datas = [];

    for (var i = 0; i < 3; i++) {
      datas.push({
        id: `fedd240a-656${i}-ab12-17b0-54b8c1eb44fa`,
        gate: `Gate ${i}`,
        dataType: 1,
        interval: 2,
        protocol: 1,
        url: `http://api.com:${i}${i}${i}`,
        detail: {
          points: [
            { x: 1654.975338302847, y: 1063.0691225165563 },
            { x: 3720.968063855665, y: 1057.4813741721855 },
            { x: 3570.2064325315405, y: 2437.655215231788 },
            { x: 1453.9598298706806, y: 2370.602235099338 },
            { x: 1453.9598298706806, y: 2370.602235099338 },
          ],
          drawType: 'Floor',
          stroke: '#D20013',
          fill: '#D2001320',
          strokeWidth: 6,
          name: 'aa',
          rendered: true,
        },
      });
    }

    return {
      options: {
        dataType: [
          { textValue: 'Type22', idValue: 1 },
          { textValue: 'Type2', idValue: 2 },
        ],
        interval: [
          { textValue: 'immediately', idValue: 1 },
          { textValue: 'asap', idValue: 2 },
        ],
        protocol: [
          { textValue: 'https', idValue: 1 },
          { textValue: 'http', idValue: 2 },
        ],
      },
      data: datas,
      columns: [
        {
          columnHeader: 'Gate',
          columnName: 'gate',
          columnType: 'text',
          columnSetting: {
            readonly: true,
            hidden: false,
          },
        },
        {
          columnHeader: 'Data Type',
          columnName: 'dataType',
          columnType: 'combobox',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Interval',
          columnName: 'interval',
          columnType: 'combobox',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Protocal',
          columnName: 'protocol',
          columnType: 'combobox',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Url',
          columnName: 'url',
          columnType: 'input',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
      ],
    } as DataRowResponse<DataPushDraw>;
  }

  getDataPush(id: string): DataRowResponse<DataPush> {
    var datas = [];

    for (var i = 0; i < 3; i++) {
      datas.push({
        id: `fedd240a-656${i}-ab12-17b0-54b8c1eb44fa`,
        gate: `Gate ${i}`,
        dataType: 1,
        interval: 2,
        protocol: 1,
        url: `http://api.com:${i}${i}${i}`,
        subRows: [
          {
            id: `childfedd240a-656${i}-ab12-17b0-54b8c1eb44fa`,
            gate: `Gate ${i}`,
            dataType: 1,
            interval: 2,
            protocol: 1,
            url: `http://child.api.com:${i}${i}${i}`,
          },
        ],
      });
    }

    datas = id ? datas.filter((element) => element.id == id) : datas;

    return {
      options: {
        dataType: [
          { textValue: 'Type2', idValue: 1 },
          { textValue: 'Type2', idValue: 2 },
        ],
        interval: [
          { textValue: 'immediately', idValue: 1 },
          { textValue: 'asap', idValue: 2 },
        ],
        protocol: [
          { textValue: 'https', idValue: 1 },
          { textValue: 'http', idValue: 2 },
        ],
      },
      data: datas,
      columns: [
        {
          columnHeader: 'Gate',
          columnName: 'gate',
          columnType: 'text',
          columnSetting: {
            readonly: true,
            hidden: false,
          },
        },
        {
          columnHeader: 'Data Type',
          columnName: 'dataType',
          columnType: 'combobox',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Interval',
          columnName: 'interval',
          columnType: 'combobox',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Protocal',
          columnName: 'protocol',
          columnType: 'combobox',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Url',
          columnName: 'url',
          columnType: 'input',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
      ],
    } as DataRowResponse<DataPush>;
  }

  // /sensor/{id}
  getSingleGate(id: string): DataRowResponse<Gate> {
    var i = 1;

    return {
      options: {
        dataType: [
          { textValue: 'Type1', idValue: 1 },
          { textValue: 'Type2', idValue: 2 },
        ],
        interval: [
          { textValue: 'immediately', idValue: 1 },
          { textValue: 'asap', idValue: 2 },
        ],
        protocol: [
          { textValue: 'https', idValue: 1 },
          { textValue: 'http', idValue: 2 },
        ],
      },
      data: id ? sensorsMock.filter((x) => x.id == id) : sensorsMock,
      columns: [
        {
          columnHeader: 'Gate',
          columnName: 'gate',
          columnType: 'text',
          columnSetting: {
            readonly: true,
            hidden: false,
          },
        },
        {
          columnHeader: 'Threshold',
          columnName: 'threshold',
          columnType: 'input',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Min Object',
          columnName: 'minObject',
          columnType: 'input',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
        {
          columnHeader: 'Chanel',
          columnName: 'chanel',
          columnType: 'input',
          columnSetting: {
            readonly: false,
            hidden: false,
          },
        },
      ],
    } as DataRowResponse<any>;
  }

  updateGate(item: Gate): Gate {
    // var itemCurrent = sensorsMock.filter((x) => x.id == item.id);
    var indexItem = findIndex(sensorsMock, (e) => e.id == item.id);
    if (indexItem >= 0) {
      sensorsMock[indexItem] = item;
      return item;
    } else {
      item.id = uuidv4();
      sensorsMock[sensorsMock.length] = item;
      return item;
    }
  }
}
