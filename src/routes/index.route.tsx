import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PublicTypeRoute from './public/public.component';
import PrivateTypeRoute from './private/private.component';

const Root: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <PublicTypeRoute />
        <PrivateTypeRoute />
      </Suspense>
    </Router>
  );
};

export default Root;
