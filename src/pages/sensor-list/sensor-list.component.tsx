import React, { useState } from 'react';

import styles from './sensor-list.module.scss';
import { makeStyles } from '@material-ui/core/styles';

import cn from 'classnames';
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from 'shared/material-ui';
import GridComponent from 'shared/grid/grid.component';
import useSensorListHook from './sensor-list.hook';
import { get } from 'lodash';
import TableComponent from 'shared/grid/table.component';

interface SensorDetailProps {}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 270,
  },
}));

const SensorDetail: React.FC<SensorDetailProps> = (
  props: SensorDetailProps
) => {
  const classes = useStyles();
  const {
    isScanning,
    networks,
    networkSelected,
    setNetworkSelected,
    scanSensor,
    header,
    sensorList,
  } = useSensorListHook();

  function rowRender(rowIndex: number, columnIndex: number): any {
    let isHeader: boolean = true;
    const headerName = header[columnIndex];
    if (rowIndex > 0) {
      isHeader = false;
    }
    if (isHeader) {
      return <div>{headerName}</div>;
    }
    return <div>{get(sensorList, [rowIndex - 1, headerName])}</div>;
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNetworkSelected(event.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.subnet}>
          <div className={styles['subnet__title']}>Scan local subnet</div>
          <div className={styles['subnet__selector']}>
            <div className={styles['subnet__selector-title']}>Interface</div>
            <FormControl className={classes.formControl}>
              <Select value={networkSelected} onChange={handleChange}>
                {networks.map((_n: any, i: number) => (
                  <MenuItem key={i} value={_n}>
                    {_n.interface}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles['subnet__info']}>
            <div className={styles['subnet__info-title']}>IP</div>
            <div className={styles['subnet__info-value']}>
              {networkSelected?.ip}
            </div>
          </div>
          <div className={styles['subnet__info']}>
            <div className={styles['subnet__info-title']}>DNS</div>
            <div className={styles['subnet__info-value']}>
              {networkSelected?.dns}
            </div>
          </div>
        </div>
        <div className={styles.action}>
          <div
            className={cn(styles.button, styles.primary)}
            onClick={() => scanSensor()}
          >
            Start
          </div>
          <div className={cn(styles.button, styles.secondary)}>Stop</div>
        </div>
      </div>
      <div className={cn(styles.table, { [styles.loading]: isScanning })}>
        {isScanning ? (
          <CircularProgress></CircularProgress>
        ) : (
          <TableComponent header={header} rows={sensorList}></TableComponent>
        )}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default SensorDetail;
