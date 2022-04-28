import React from 'react';

import ImageCanvasComponent from '../canvas/image-canvas.container';
import { DrawType } from 'constants/recognition-properties.constant';
import styles from './recognition-properties.module.scss';

import TestImage from './camera.jpg';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Grid,
  Tooltip,
  Paper,
} from 'components/material-ui';

import useRecognitionPropertiesHook from './recognition-properties.hook';
import { cloneDeep } from 'lodash';
<<<<<<< Updated upstream
import TableComponent from 'components/table/table.component';
=======
import TableComponent from 'shared/table/table.component';
>>>>>>> Stashed changes
import { useLayoutStyle } from 'utils/theme.util';
import classNames from 'classnames';

interface RecognitionPropertiesProps {}

const RecognitionProperties: React.FC<RecognitionPropertiesProps> = () => {
  const {
    canvasRef,

    gateName,
    setGateName,
    drawType,
    setDrawType,

    fullScreen,

    dataDraw,
    setDataDraw,
    backgroundType,
    // setBackgroundType,

<<<<<<< Updated upstream
    addNewGate,
=======
    saveObject,
>>>>>>> Stashed changes
    updateObjectProps,

    data,
    columns,

    reloadPage,
    saveGates,

    onDataChange,
  } = useRecognitionPropertiesHook();

  const styleDarkMode = useLayoutStyle();
  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <div className={classNames(styles['group-button'])}>
          <div className={classNames(styles['group-button__title'])}>Line</div>
          <button
            onClick={() => setDrawType(DrawType.LineIn)}
            className={classNames(styles.button, styleDarkMode.bgHeader, {
              [styleDarkMode.groupButtonSelected]: drawType === DrawType.LineIn,
            })}
          >
            Line in
          </button>
          <button
            onClick={() => setDrawType(DrawType.LineOut)}
            className={classNames(styles.button, styleDarkMode.bgHeader, {
              [styleDarkMode.groupButtonSelected]:
                drawType === DrawType.LineOut,
            })}
          >
            Line out
          </button>
          <button
            onClick={() => setDrawType(DrawType.LineInAndOut)}
            className={classNames(styles.button, styleDarkMode.bgHeader, {
              [styleDarkMode.groupButtonSelected]:
                drawType === DrawType.LineInAndOut,
            })}
          >
            Line in/out
          </button>
        </div>
        <div className={classNames(styles['group-button'])}>
          <div className={classNames(styles['group-button__title'])}>Zone</div>
          <button
            onClick={() => setDrawType(DrawType.ZoneFloor)}
            className={classNames(styles.button, styleDarkMode.bgHeader, {
              [styleDarkMode.groupButtonSelected]:
                drawType === DrawType.ZoneFloor,
            })}
          >
            Floor
          </button>
          <button
            onClick={() => setDrawType(DrawType.ZoneExclusion)}
            className={classNames(styles.button, styleDarkMode.bgHeader, {
              [styleDarkMode.groupButtonSelected]:
                drawType === DrawType.ZoneExclusion,
            })}
          >
            Exclusion
          </button>
          <button
            onClick={() => setDrawType(DrawType.ZoneMark)}
            className={classNames(styles.button, styleDarkMode.bgHeader, {
              [styleDarkMode.groupButtonSelected]:
                drawType === DrawType.ZoneMark,
            })}
          >
            Mask
          </button>
        </div>
<<<<<<< Updated upstream
        <div className={classNames(styles['group-button'])}>
          <div className={classNames(styles['group-button__title'])}>
            Counting
          </div>
          <button
            className={classNames(
              styles.button,
              styleDarkMode.bgHeader,
              styleDarkMode.groupButtonSelected
            )}
          >
            <i
              className={classNames(
                'fal fa-long-arrow-up',
                styles['group-button__icon'],
                styles['group-button__icon-out']
              )}
            ></i>{' '}
            Out: 2
          </button>
          <button
            className={classNames(
              styles.button,
              styleDarkMode.bgHeader,
              styleDarkMode.groupButtonSelected
            )}
          >
            <i
              className={classNames(
                'fal fa-long-arrow-down',
                styles['group-button__icon'],
                styles['group-button__icon-in']
              )}
            ></i>
            In: 1
          </button>
        </div>
        <div className={styles['flex-1']}></div>
        <Tooltip title="Reload">
          <div
            onClick={() => reloadPage()}
            className={classNames(
              styles['icon-button'],
              styleDarkMode.groupButton
            )}
          >
            <i className="fal fa-history"></i>
          </div>
        </Tooltip>

        <Tooltip title="Save">
          <div
            onClick={() => saveGates()}
            className={classNames(
              styles['icon-button'],
              styleDarkMode.groupButtonPrimary
            )}
          >
            <i className="fal fa-save"></i>
          </div>
        </Tooltip>
        {/* <div
=======
        <div className={styles['flex-1']}></div>
        <div
>>>>>>> Stashed changes
          onClick={() => setBackgroundType(BackgroundType.Image)}
          className={classNames(
            styles['icon-button'],
            styleDarkMode.groupButton,
            {
              [styleDarkMode.groupButtonSelected]:
                backgroundType === BackgroundType.Image,
            }
          )}
<<<<<<< Updated upstream
        >
          <i className="fal fa-camera"></i>
        </div>
        <div
=======
        >
          <i className="fal fa-camera"></i>
        </div>
        <div
          onClick={() => setBackgroundType(BackgroundType.Video)}
          className={classNames(
            styles['icon-button'],
            styleDarkMode.groupButton,
            {
              [styleDarkMode.groupButtonSelected]:
                backgroundType === BackgroundType.Video,
            }
          )}
        >
          <i className="fal fa-video"></i>
        </div>
        {/* <button
>>>>>>> Stashed changes
          onClick={() => setBackgroundType(BackgroundType.Video)}
          className={classNames(
            styles['icon-button'],
            styleDarkMode.groupButton,
            {
              [styleDarkMode.groupButtonSelected]:
                backgroundType === BackgroundType.Video,
            }
          )}
        >
          <i className="fal fa-video"></i>
        </div> */}
      </div>
      <div className={styles.image}>
        <ImageCanvasComponent
          ref={canvasRef}
          finishDraw={(data: any) => {
<<<<<<< Updated upstream
            if (!data) return;
            if (!data.id && !data.isCreated) {
              setDataDraw(cloneDeep(data));
            } else {
              updateObjectProps(data);
            }
=======
            console.log(data);
            (canvasRef?.current as any).getAlert();
            setDataDraw(cloneDeep(data));
>>>>>>> Stashed changes
          }}
          backgroundType={backgroundType}
          drawType={drawType}
          imageSource={TestImage}
        ></ImageCanvasComponent>
      </div>
      <Grid
        className={styles.detail}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6} className={styles['detail__gate']}>
          <div className={styles['detail__title']}>Scene Elements</div>
          <div style={{ height: 'calc(100% - 21px)' }}>
            <TableComponent
              data={data}
              header={columns}
              rowHeight={50}
              disableSelectedRow={true}
              onDataCellChanged={(props: any) => onDataChange(props)}
            ></TableComponent>
          </div>
        </Grid>
        <Grid item xs={6} className={styles['detail__learn']}>
          <div className={styles['detail__title']}>Learn in</div>
          <Paper className={styles['detail__card']} elevation={1}>
            <Grid container direction="row" alignItems="flex-start">
              <Grid item xs={8}></Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Learn in
                </Button>
              </Grid>
              <Grid item xs={8} className={styles['detail__learn-title']}>
                Learn in successfully
              </Grid>
              <Grid item xs={4} className={styles['detail__learn-value']}>
                500
              </Grid>
              <Grid item xs={8} className={styles['detail__learn-title']}>
                Replace distance
              </Grid>
              <Grid item xs={4} className={styles['detail__learn-value']}>
                2701
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        disableEscapeKeyDown
        disableBackdropClick
        classes={{
          paper: styles.dialog,
        }}
        fullScreen={fullScreen}
        open={!!dataDraw}
      >
        <DialogTitle disableTypography>
          <Typography align="center" variant="h4">
            Create {dataDraw?.drawType}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label={dataDraw?.drawType + ' name'}
            value={gateName}
            onChange={(e: any) => {
              setGateName(e.target.value);
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
<<<<<<< Updated upstream
              (canvasRef.current as any).removePolyObject(dataDraw?.polyName);
=======
              (canvasRef.current as any).removePolyObject(dataDraw.polyName);
>>>>>>> Stashed changes
              setDataDraw(null);
              setGateName('');
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!gateName}
            onClick={() => addNewGate()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecognitionProperties;
