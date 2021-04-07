import React, { useEffect } from 'react';

import style from './layout.module.scss';

import LayoutHeaderComponent from './header.container';

interface LayoutProps {
  children: any;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <LayoutHeaderComponent />
      <div className={style.wrapper}>
        <div className={style.children}>{children}</div>
      </div>
    </>
  );
};

export default LayoutComponent;
