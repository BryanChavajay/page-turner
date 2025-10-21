import { Route, Routes } from "react-router-dom";

export const RoutesWithNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};
