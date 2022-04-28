import React, { useState } from 'react';
import cn from 'classnames';
import produce from 'immer';

import RecognitionProperties from './recognition-properties/recognition-properties.component';
import DataPush from './data-push/data-push.component';
import styles from './sensor-configuration.module.scss';

import { useLayoutStyle } from 'utils/theme.util';

interface SensorDetailProps {}

enum Tab {
  RecognitionProperties = 1,
  DataPush = 2,
}

const SensorDetail: React.FC<SensorDetailProps> = () => {
  const [state, setState] = useState<{ tabSelected: Tab; isActive: boolean }>({
    tabSelected: Tab.RecognitionProperties,
    isActive: false,
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  const styleDarkMode = useLayoutStyle();
  return (
    <div className={styles.container}>
      <div className={cn(styles.tab, styleDarkMode.tabContainer)}>
        <div
          className={cn(styles['tab__button'], styleDarkMode.tabButton, {
            [styles.selected]: state.tabSelected === Tab.RecognitionProperties,
            [styleDarkMode.tabButtonSelected]:
              state.tabSelected === Tab.RecognitionProperties,
          })}
          onClick={() =>
            setState(
              produce((draft: any) => {
                draft.tabSelected = Tab.RecognitionProperties;
              })
            )
          }
        >
          Recognition Properties
        </div>
        <div
          className={cn(styles['tab__button'], styleDarkMode.tabButton, {
            [styles.selected]: state.tabSelected === Tab.DataPush,
            [styleDarkMode.tabButtonSelected]:
              state.tabSelected === Tab.DataPush,
          })}
<<<<<<< Updated upstream
          onClick={() =>
            setState(
              produce((draft: any) => {
                draft.tabSelected = Tab.DataPush;
                draft.isActive = true;
              })
            )
          }
=======
          onClick={() => {
            setTabSelected(Tab.DataPush);
            if (!isActive) setIsActive(true);
          }}
>>>>>>> Stashed changes
        >
          Data Push
        </div>
      </div>
      <div
        className={cn(styles.content, {
          [styles.show]: state.tabSelected === Tab.RecognitionProperties,
        })}
      >
        <RecognitionProperties></RecognitionProperties>
      </div>
      <div
        className={cn(styles.content, {
          [styles.show]: state.tabSelected === Tab.DataPush,
        })}
      >
<<<<<<< Updated upstream
        <DataPush isActive={state.isActive}></DataPush>
=======
        <DataPush isActive={isActive}></DataPush>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default SensorDetail;
