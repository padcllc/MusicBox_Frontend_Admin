import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Main } from "../pages/index";
import { Songs, Restaurats, Users, Admin, Genre } from "../pages/main/pages";

export function MainRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Navigate to="/songs" />} />
            <Route path='/songs' element={<Songs />} />
            <Route path="/genres" element={<Genre />} />
            <Route path='/restaurants' element={<Restaurats />} />
            <Route path='/users' element={<Users />} />
            <Route path='/admins' element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/songs" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

