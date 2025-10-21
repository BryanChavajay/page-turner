import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

import { RoutesWithNotFound } from "../../utils/RoutesWithNotFound.jsx";
import { PUBLIC_ROUTES } from "../../utils/routes.jsx";

const Home = lazy(() => import("../Home/Home.jsx"));

export const Private = () => {
  return (
    <RoutesWithNotFound>
      <Route
        path={PUBLIC_ROUTES.PRIVATE}
        element={<Navigate to={PUBLIC_ROUTES.HOME} />}
      />
      <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
    </RoutesWithNotFound>
  );
};
