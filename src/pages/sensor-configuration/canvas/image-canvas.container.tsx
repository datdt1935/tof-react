import React from 'react';
import styles from './image-canvas.module.scss';

import useImageCanvasHook from './image-canvas.hook';
import {
  BackgroundType,
  DrawType,
} from '../recognition-properties/recognition-properties.constant';

interface IImageCanvasProps {
  imageSource: string;
  width: number;
  height: number;
  captureOcrData: Function;
  dataRectangle?: any[];
  drawType: DrawType;
  backgroundType: BackgroundType;
}

const ImageCanvasContainer: React.FC<IImageCanvasProps> = ({
  captureOcrData,
  imageSource,
  width,
  height,
  dataRectangle,
  drawType,
  backgroundType,
}) => {
  const { isError } = useImageCanvasHook(
    imageSource,
    width,
    height,
    captureOcrData,
    drawType,
    backgroundType,
    dataRectangle
  );

  return (
    <>
      {isError && (
        <div className={styles['image-canvas__error']}>No image available</div>
      )}
      <div
        id="image-canvas__wrapper"
        style={{ position: 'relative', height: '100%' }}
      >
        <div
          id="image__canvas-container"
          style={{ height: '100%' }}
          className={styles['image-canvas__container']}
        >
          <canvas id="image__canvas"></canvas>
        </div>
      </div>
      <video
        crossOrigin="anonymous"
        id="video1"
        style={{ display: 'none' }}
        className="canvas-img"
        width={width}
        height={height}
      >
        <source
          id="video_src1"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
};

export default ImageCanvasContainer;
