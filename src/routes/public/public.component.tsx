import React from "react";
import { Route } from "react-router-dom";

import ListPublicRoutes from "./public.type";

const PublicRoute: React.FC = () => (
  <>
    {ListPublicRoutes.map((route, i) => (
      <Route key={i} {...route} />
    ))}
  </>
);

export default PublicRoute;
