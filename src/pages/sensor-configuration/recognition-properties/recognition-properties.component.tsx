import React, { useState } from 'react';

import ImageCanvasComponent from '../canvas/image-canvas.container';
import { BackgroundType, DrawType } from './recognition-properties.constant';
import styles from './recognition-properties.module.scss';

import TestImage from './test.jpg';

interface SensorConfigurationProps {}

const SensorConfiguration: React.FC<SensorConfigurationProps> = () => {
  const [drawType, setDrawType] = useState<DrawType>(DrawType.Line);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(
    BackgroundType.Image
  );

  return (
    <>
      <div className={styles.action}>
        <button
          onClick={() => setDrawType(DrawType.Line)}
          className={styles.button}
        >
          Line
        </button>
        <button
          onClick={() => setDrawType(DrawType.Zone)}
          className={styles.button}
        >
          Zone
        </button>
        <div className={styles['flex-1']}></div>
        <button
          onClick={() => setBackgroundType(BackgroundType.Image)}
          className={styles.button}
        >
          Image
        </button>
        <button
          onClick={() => setBackgroundType(BackgroundType.Video)}
          className={styles.button}
        >
          Videos
        </button>
      </div>
      <ImageCanvasComponent
        captureOcrData={() => undefined}
        backgroundType={backgroundType}
        drawType={drawType}
        height={800}
        width={1000}
        imageSource={TestImage}
        key="agkhjaghahgiua"
      ></ImageCanvasComponent>
    </>
  );
};

export default SensorConfiguration;
