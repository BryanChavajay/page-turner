import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

import { RoutesWithNotFound } from "../../utils/RoutesWithNotFound.jsx";
import { PRIVATE_ROUTES } from "../../utils/routes.jsx";

const Home = lazy(() => import("./Home/Home.jsx"));

export const Private = () => {
  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={<Navigate to={PRIVATE_ROUTES.HOME} />}
      />
      <Route path={PRIVATE_ROUTES.HOME} element={<Home />} />
    </RoutesWithNotFound>
  );
};

export default Private;