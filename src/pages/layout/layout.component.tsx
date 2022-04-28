import React from 'react';

import cn from 'classnames';

import style from './layout.module.scss';

import LayoutHeaderComponent from './header.container';

import { useLayoutStyle } from 'utils/theme.util';

interface LayoutProps {
  children: any;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const styleDarkMode = useLayoutStyle();

  return (
    <>
      <LayoutHeaderComponent styleDarkMode={styleDarkMode} />
      <div className={cn(style.wrapper, styleDarkMode.bgLevel1)}>
        <div className={cn(style.children, styleDarkMode.bgLevel1)}>
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutComponent;
