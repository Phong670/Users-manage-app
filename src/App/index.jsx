import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { ROUTES } from "../constants/routes";

import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../papes/admin/todolist/index";

import "../App.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.HOME} element={<HomePage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
