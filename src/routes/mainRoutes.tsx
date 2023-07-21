import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Main } from "../pages/index";

export function MainRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}