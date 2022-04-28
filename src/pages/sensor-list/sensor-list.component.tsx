import React from 'react';

import styles from './sensor-list.module.scss';

import cn from 'classnames';
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from 'components/material-ui';
import useSensorListHook from './sensor-list.hook';
import TableComponent from 'components/table/table.component';
import { useHistory } from 'react-router-dom';
import WEB_ROUTES from 'constants/web-router';
import { useLayoutStyle } from 'utils/theme.util';

interface SensorDetailProps {}

const SensorDetail: React.FC<SensorDetailProps> = () => {
  const {
    isScanning,
    networks,
    networkSelected,
    selectNetwork,
    scanSensor,
    stopScanning,

    sensorSelected,
    onRowSelected,

    sensorList,
    header,
  } = useSensorListHook();
  const history = useHistory();
  const styleDarkMode = useLayoutStyle();

  return (
    <div className={styles.container}>
      <div className={cn(styles['container__title'], styleDarkMode.bgHeader)}>
        Scan local subnet
      </div>
      <div className={styles.info}>
        <div className={styles.subnet}>
          <div className={styles['subnet__selector']}>
            <div
              className={cn(
                styles['subnet__selector-title'],
                styleDarkMode.textSubTitle
              )}
            >
              Interface
            </div>
            <FormControl className={styles['form-control']}>
              <Select
                value={networkSelected}
                disabled={isScanning}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
                  selectNetwork(event.target.value)
                }
              >
                {networks.map((_n: any, i: number) => (
                  <MenuItem key={i} value={_n}>
                    {_n.interface}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles['subnet__info']}>
            <div
              className={cn(
                styles['subnet__info-title'],
                styleDarkMode.textSubTitle
              )}
            >
              IP
            </div>
            <div className={styles['subnet__info-value']}>
              {networkSelected?.ip}
            </div>
          </div>
          <div className={styles['subnet__info']}>
            <div
              className={cn(
                styles['subnet__info-title'],
                styleDarkMode.textSubTitle
              )}
            >
              DNS
            </div>
            <div className={styles['subnet__info-value']}>
              {networkSelected?.dns}
            </div>
          </div>
        </div>
        <div className={styles.action}>
          <Button
            classes={{ root: cn(styles.button) }}
            color="primary"
            disabled={!networkSelected?.interface || isScanning}
            onClick={() => scanSensor()}
            variant="contained"
          >
            Start
            {isScanning && (
              <CircularProgress
                size={20}
                className={styles['circular-progress']}
              ></CircularProgress>
            )}
          </Button>

          <Button
            classes={{ root: cn(styles.button) }}
            color="secondary"
            disabled={!isScanning}
            onClick={stopScanning}
            variant="contained"
          >
            Stop
          </Button>
        </div>
      </div>
      <div
        className={cn(styles.table, styleDarkMode.tableContainer, {
          [styles.loading]: isScanning,
        })}
      >
        <TableComponent
          data={sensorList}
          header={header}
          readonlyTable={true}
          rowHeight={50}
          onRowSelected={(row: any) => onRowSelected(row)}
          onRowDblClick={(row: any) =>
            history.push(WEB_ROUTES.SENSOR_DETAIL.path + '/' + row.id)
          }
        ></TableComponent>
      </div>
      <div className={styles.footer}>
        <Button
          classes={{ root: cn(styles.button) }}
          color="primary"
          disabled={!sensorSelected}
          onClick={() =>
            history.push(
              WEB_ROUTES.SENSOR_DETAIL.path + '/' + sensorSelected?.id
            )
          }
          variant="contained"
        >
          Sensor setting
        </Button>
      </div>
    </div>
  );
};

export default SensorDetail;
