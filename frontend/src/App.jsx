import { lazy } from "react";
import { BrowserRouter, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { RoutesWithNotFound } from "./utils/RoutesWithNotFound.jsx";
import { AuthGuard } from "./utils/AuthGuard.jsx";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./utils/routes.jsx";

import { Login } from "./modules/Login/Login.jsx";
const Private = lazy(() => import("./modules/private/private.jsx"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to={PRIVATE_ROUTES.PRIVATE} />} />
          <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path={PRIVATE_ROUTES.PRIVATE} element={<Private />} />
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
