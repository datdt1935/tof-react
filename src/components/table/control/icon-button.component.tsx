import React from 'react';
import { CellActionProps } from '../table.constant';

import styles from './control.module.scss';

const TableControlIconButton: React.FC<any> = ({
  row: { index },
  value,

  actions,
  data,
}) => {
  return (
    <div className={styles['icon-button-container']}>
      {actions.map((action: CellActionProps, i: number) => (
        <div
          style={action.style || {}}
          className={styles['icon-button']}
          onClick={() => action.onClick(index, data)}
          key={`icon-button__${index}-${i}`}
        >
          <i className={action.faIcon}></i>
        </div>
      ))}
    </div>
  );
};

TableControlIconButton.defaultProps = {
  onDataChanged: () => undefined,
};

export default TableControlIconButton;
