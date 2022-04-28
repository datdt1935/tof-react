import React, { forwardRef } from 'react';

import styles from './image-canvas.module.scss';

import ObjectPropertiesComponent from './object-properties/object-properties.component';

import useImageCanvasHook from './image-canvas.hook';
import {
  BackgroundType,
  DrawType,
<<<<<<< Updated upstream
} from 'constants/recognition-properties.constant';
=======
} from '../recognition-properties/recognition-properties.constant';
>>>>>>> Stashed changes
import classNames from 'classnames';
import { useLayoutStyle } from 'utils/theme.util';

interface IImageCanvasProps {
  imageSource: string;
  finishDraw: Function;
  drawType: DrawType;
  backgroundType: BackgroundType;
  ref?: any;
}

const ImageCanvasContainer: React.FC<IImageCanvasProps> = forwardRef(
  ({ finishDraw, imageSource, drawType, backgroundType }, ref) => {
<<<<<<< Updated upstream
    const {
      activeObject,
      updateActiveObject,
      isError,
      containerRef,
      updateObjectByPolyName,
    } = useImageCanvasHook(
=======
    const { activeObject, isError, containerRef } = useImageCanvasHook(
>>>>>>> Stashed changes
      imageSource,
      finishDraw,
      drawType,
      backgroundType,
      ref
    );
    const styleDarkMode = useLayoutStyle();

    return (
      <>
        {isError && (
          <div className={styles['image-canvas__error']}>
            No image available
          </div>
        )}
        <div
          id="image__canvas-container"
          ref={containerRef}
          style={{ height: '100%' }}
          className={classNames(
            styles['image-canvas__container'],
            styleDarkMode.bgHeader
          )}
        >
          <canvas id="image__canvas"></canvas>
        </div>
        <ObjectPropertiesComponent
          data={activeObject}
          updateActiveObject={updateActiveObject}
          updateObjectProperty={updateObjectByPolyName}
=======
>>>>>>> Stashed changes
        ></ObjectPropertiesComponent>
      </>
    );
  }
);

export default ImageCanvasContainer;
