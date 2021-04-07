import React, { useState } from 'react';

import SensorConfiguration from './recognition-properties/recognition-properties.component';
import styles from './sensor-configuration.module.scss';

import cn from 'classnames';

interface SensorDetailProps {}

enum Tab {
  RecognitionProperties = 1,
  DataPush = 2,
}

const SensorDetail: React.FC<SensorDetailProps> = (
  props: SensorDetailProps
) => {
  const [tabSelected, setTabSelected] = useState<Tab>(
    Tab.RecognitionProperties
  );
  return (
    <div className={styles.container}>
      <div className={styles.tab}>
        <div
          className={cn(styles['tab__button'], {
            [styles.selected]: tabSelected === Tab.RecognitionProperties,
          })}
          onClick={() => setTabSelected(Tab.RecognitionProperties)}
        >
          Recognition Properties
        </div>
        <div
          className={cn(styles['tab__button'], {
            [styles.selected]: tabSelected === Tab.DataPush,
          })}
          onClick={() => setTabSelected(Tab.DataPush)}
        >
          Data Push
        </div>
      </div>
      <div
        className={cn(styles.content, {
          [styles.show]: tabSelected === Tab.RecognitionProperties,
        })}
      >
        <SensorConfiguration></SensorConfiguration>
      </div>
    </div>
  );
};

export default SensorDetail;
