import classNames from 'classnames';
<<<<<<< Updated upstream
import { DrawType } from 'constants/recognition-properties.constant';
import React, { useEffect, useState } from 'react';
import {
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from 'components/material-ui';
import TableControlAutocomplete from 'components/table/control/select.component';
import { getOptionByType } from '../image-canvas.util';
=======
import React, { useEffect, useState } from 'react';
import { Paper, Typography } from 'shared/material-ui';
>>>>>>> Stashed changes

import styles from './object-properties.module.scss';
import {
  initialObjectPropertiesState,
  ObjectPropertiesState,
} from 'constants/canvas.contant';
import produce from 'immer';

interface ObjectPropertiesProps {
  data: any;
<<<<<<< Updated upstream
  updateObjectProperty: Function;
  updateActiveObject: Function;
}

const ObjectPropertiesComponent: React.FC<ObjectPropertiesProps> = ({
  data,
<<<<<<< Updated upstream
  updateObjectProperty,
  updateActiveObject,
}) => {
  const [state, setState] = useState<ObjectPropertiesState>(
    initialObjectPropertiesState
  );

  useEffect(() => {
    setState(
      produce((draft: ObjectPropertiesState) => {
        draft.drawType = data?.drawType || DrawType.LineIn;
        draft.fillColor = data?.fill || '';
        draft.strokeColor = data?.stroke || '';
      })
    );
  }, [data]);

  const onChangeDrawType = (value: DrawType) => {
    if (value === state.drawType) return;
    const { fill, stroke } = getOptionByType(value);
    setState(
      produce((draft: ObjectPropertiesState) => {
        draft.drawType = value;
        draft.fillColor = fill || '';
        draft.strokeColor = stroke || '';
      })
    );
  };

  const saveProperties = () => {
    const updateData = {
      fill: state.fillColor || 'transparent',
      stroke: state.strokeColor || 'transparent',
      drawType: state.drawType,
    };
    updateActiveObject(updateData);

    updateObjectProperty(
      data.polyName,
      updateData,
      true,
      state.drawType !== data.drawType
    );
  };

  if (!data?.id && !data?.isCreated) return <div></div>;

  return (
    <Paper elevation={3} className={classNames(styles['object-properties'])}>
      <div className={styles['object-properties__header']}>
        <Typography align="center">Properties</Typography>
      </div>
      <div className={styles['object-properties__row']}>
        <Typography
          align="center"
          className={styles['object-properties__title']}
        >
          Type
        </Typography>
        <TableControlAutocomplete
          className={styles['object-properties__control']}
          value={state.drawType || ''}
          row={{}}
          column={{ id: 'drawType' }}
          onDataChanged={(index: any, column: any, value: any) => {
            onChangeDrawType(value.idValue);
          }}
        ></TableControlAutocomplete>
      </div>
      <div className={styles['object-properties__row']}>
        <Typography
          align="center"
          className={styles['object-properties__title']}
        >
          Stroke
        </Typography>
        <TextField
          className={styles['object-properties__control']}
          value={state.strokeColor}
          onChange={(e: any) =>
            setState(
              produce((draft: ObjectPropertiesState) => {
                draft.strokeColor = e.target.value || '';
              })
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div
                  className={styles['object-properties__color-preview']}
                  style={{ backgroundColor: state.strokeColor }}
                ></div>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>
      <div className={styles['object-properties__row']}>
        <Typography
          align="center"
          className={styles['object-properties__title']}
        >
          Fill
        </Typography>
        <TextField
          className={styles['object-properties__control']}
          value={state.fillColor}
          onChange={(e: any) =>
            setState(
              produce((draft: ObjectPropertiesState) => {
                draft.fillColor = e.target.value || '';
              })
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div
                  className={styles['object-properties__color-preview']}
                  style={{ backgroundColor: state.fillColor }}
                ></div>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>
      <div className={styles['object-properties__action']}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveProperties()}
        >
          Apply
        </Button>
      </div>
=======
}) => {
  console.log(data);
  const [originalData, setOriginalData] = useState<any>(data);

  useEffect(() => {
    if (data?.id !== originalData?.id) setOriginalData(data);
  }, [data, originalData?.id]);

  if (!data) return <div></div>;
  return (
    <Paper
      elevation={3}
      className={classNames(styles['object-properties'], {
        [styles.show]: !!data,
      })}
    >
      <div className={styles['object-properties__header']}>
        <Typography align="center">Properties</Typography>
      </div>
>>>>>>> Stashed changes
    </Paper>
  );
};

export default ObjectPropertiesComponent;
