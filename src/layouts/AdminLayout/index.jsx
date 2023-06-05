import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import ToDoList from "../../papes/admin/todolist";

import * as S from "./styles";

function AdminLayout() {
  return (
    <S.MainWrapper>
      <Outlet />
    </S.MainWrapper>
  );
}
export default AdminLayout;
