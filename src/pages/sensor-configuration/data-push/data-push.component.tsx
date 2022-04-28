<<<<<<< Updated upstream
import React from 'react';
import { Typography } from 'components/material-ui';
import TableComponent from 'components/table/table.component';
=======
import React, { useState } from 'react';
import { Button, Typography } from 'shared/material-ui';
import TableComponent from 'shared/table/table.component';
import { useLayoutStyle } from 'utils/theme.util';
>>>>>>> Stashed changes

import useDataPushHook from './data-push.hook';

import styles from './data-push.module.scss';

interface DataPushProps {
  isActive: boolean;
}
const DataPush: React.FC<DataPushProps> = ({ isActive }) => {
<<<<<<< Updated upstream
  const { data, columns, addNewData } = useDataPushHook(isActive);
=======
  const { data, columns } = useDataPushHook(isActive);
  //   console.log('🚀 ~ file: data-push.component.tsx ~ line 6 ~ gates', gates);
  const styleDarkMode = useLayoutStyle();
>>>>>>> Stashed changes

  return (
    <div className={styles['data-push']}>
      <div className={styles['data-push__header']}>
        <Typography className={styles['data-push__header-title']}>
          Edit data push out
        </Typography>
<<<<<<< Updated upstream
=======
        <Button
          color="primary"
          variant="outlined"
          className={styles['data-push__header-button']}
        >
          Add new Row
        </Button>
>>>>>>> Stashed changes
      </div>
      <div className={styles['data-push__table']}>
        <TableComponent
          data={data}
          header={columns}
          rowHeight={50}
          disableSelectedRow={true}
<<<<<<< Updated upstream
          isExpand={true}
          onAddRow={addNewData}
=======
>>>>>>> Stashed changes
        ></TableComponent>
      </div>
    </div>
  );
};

export default DataPush;
