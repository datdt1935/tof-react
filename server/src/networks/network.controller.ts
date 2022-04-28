import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { IOptionDropdow } from 'src/interfaces/IDataTable';
import { DataRowResponse } from 'src/models/DataRowResponse';
import { Gate } from 'src/models/Gate';
import { NetWorkService } from './network.service';
@ApiTags('Network API')
@Controller('networks')
export class NetworkController {
  constructor(private readonly networkService: NetWorkService) {}
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  addMaskNetWorkSample(): any {
    this.networkService.addInterFace();
    return this.networkService.getAllMaskNet().length;
  }

  @Get()
  @ApiCreatedResponse({
    description: 'You got alls.',
  })
  getAll() {
    return this.networkService.getAllMaskNet();
  }

  @Get('GetOptions')
  @ApiCreatedResponse({
    description: 'Get option for dropbox table ',
  })
  GetOptionsDropBoxs(controlType: string): IOptionDropdow[] {
    return [
      { textValue: 'A', idValue: 1 },
      { textValue: 'B', idValue: 2 },
    ];
    // return this.networkService.getTestString();
  }

  @Get('GetDataTable')
  @ApiCreatedResponse({
    description: 'Get option for dropbox table ',
  })
  GetDataTable(): DataRowResponse<any> {
    var result: DataRowResponse<any> = new DataRowResponse();
    result.data = [
      {
        firstName: 'sleet',
        lastName: 'tail',
        age: 2,
        visits: 20,
        progress: 43,
        status: 'complicated',
      },
      {
        firstName: 'sleet',
        lastName: 'tail',
        age: 2,
        visits: 20,
        progress: 43,
        status: 'complicated',
        subRows: [
          {
            firstName: 'sleetchild',
            lastName: 'tail',
            age: 2,
            visits: 20,
            progress: 43,
            status: 'complicated',
          },
        ],
      },
    ];
    result.columns = [
      {
        columnHeader: 'Firstname',
        columnName: 'firstName',
        columnType: 'input',
        columnSetting: {
          readonly: false,
          hidden: false,
        },
      },
      {
        columnHeader: 'Lastname',
        columnName: 'lastname',
        columnType: 'input',
        columnSetting: {
          readonly: false,
          hidden: false,
        },
      },
      {
        columnHeader: 'Type',
        columnName: 'type',
        columnType: 'combobox',
        columnSetting: {
          readonly: false,
          hidden: false,
        },
      },
    ];

    return result;
  }

  // @Get('GetGates')
  // @ApiCreatedResponse({
  //   description: 'All data push screen',
  // })
  // GetGates() {
  //   return this.networkService.getAllGates();
  // }

  @Get('GetDataPush')
  @ApiCreatedResponse({
    description: 'All data push screen',
  })
  GetDataPush(id: string) {
    id = null;
    return this.networkService.getDataPush(id);
  }

  @Get('GetSensorsData')
  @ApiCreatedResponse({
    description: 'For screen Scan local subsnet',
  })
  GetSensors() {
    return this.networkService.getSensors();
  }

  @Get('GetSingleGate')
  @ApiCreatedResponse({
    description: `For screen Recognition Properties`,
  })
  GetSingleGate(id: string) {
    // If id == null will return all
    id = null;
    return this.networkService.getSingleGate(id);
  }

  @Post('UpdateGate')
  @ApiCreatedResponse({
    description: `For screen Recognition Properties`,
  })
  UpdateGate(@Body() item: Gate) {
    // If id == null will return all
    return this.networkService.updateGate(item);
  }
}
