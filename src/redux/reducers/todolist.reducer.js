import { createReducer } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const inivitialState = {
  todoList: [],
};

const createToDoListReducer = createReducer(inivitialState, {
  ADD_TO_DO: (state, action) => {
    const newValues = {
      ...action.payload,
      id: uuidv4(),
    };

    const newToDoList = [...state.todoList, newValues];

    return {
      ...state,
      todoList: newToDoList,
    };
  },
  EDIT_TO_DO: (state, action) => {
    const { id } = {
      ...action.payload,
    };
    const { values } = {
      ...action.payload,
    };
    const valuesEdit = {
      id,
      ...values,
    };
    const index = state.todoList.findIndex((item) => item.id === id);
    const newToDoList = [...state.todoList];
    newToDoList.splice(index, 1, valuesEdit);

    return {
      ...state,
      todoList: newToDoList,
    };
  },
  REMOVE_TO_DO: (state, action) => {
    const { id } = {
      ...action.payload,
    };

    const index = state.todoList.findIndex((item) => item.id === id);
    const newToDoList = [...state.todoList];
    newToDoList.splice(index, 1);

    return {
      ...state,
      todoList: newToDoList,
    };
  },
});
export default createToDoListReducer;
