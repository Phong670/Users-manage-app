import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { addToDoAction } from "../../../redux/actions/todolist.action";

import ToDoListItem from "./TodoItem";
import { useState } from "react";

function ToDoList() {
  const [addForm] = Form.useForm();
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);

  const [valuesHandle, setValuesHandle] = useState({});

  const [errorAlert, setErrorAlert] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const checkUser = (nameInput) => {
    if (todoList.find((item) => item.name === nameInput)) {
      setErrorAlert(
        `Error white creating User: Unable to create. A User with name ${nameInput} already exits)`
      );
      setShowErrorAlert(true);
    } else {
      dispatch(addToDoAction(valuesHandle));
      addForm.resetFields();
      setErrorAlert("");
    }
  };
  const getValues = (e) => {
    return e.target.value;
  };
  const onReset = () => {
    addForm.resetFields();
    setShowErrorAlert(false);
  };

  return (
    <div>
      <div className="w-[800px] bg-[white] mb-4 rounded-[8px] overflow-hidden">
        <div className="p-4 bg-[#5ea9ef44] border-b-[1px] border-[#f1b50d]">
          User
        </div>
        <div className="mt-2 p-2 flex justify-center flex-wrap">
          <div className="h-[40px] mb-2 w-full ">
            <div
              className={` bg-[#ee7e7e20] w-full rounded-md ${
                showErrorAlert && "px-2 py-[8px]"
              } `}
            >
              {showErrorAlert ? errorAlert : ""}
            </div>
          </div>

          <Form
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              width: "80%",
            }}
            form={addForm}
            onFinish={() => {
              checkUser(valuesHandle.name);
            }}
            onChange={() => {
              setShowErrorAlert(false);
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              validateFirst
              rules={[
                {
                  required: true,
                  message: "Please enter Name!",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  // name = getValues(e);

                  setValuesHandle({ ...valuesHandle, name: getValues(e) });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              validateFirst
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter Age ",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  const age = getValues(e);
                  setValuesHandle({ ...valuesHandle, age });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Salary"
              name="salary"
              validateFirst
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter Salary ",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  const salary = getValues(e);
                  setValuesHandle({ ...valuesHandle, salary });
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 14,
              }}
            >
              <Button className="mx-[10px]" htmlType="submit">
                Add
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset Form
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="w-[800px] bg-[white] rounded-[8px] overflow-hidden">
        <div className="p-4 bg-[#5ea9ef44] border-b-[1px] border-[#f1b50d]">
          List of Users
        </div>
        <div>
          <ToDoListItem data={todoList} />
        </div>
      </div>
    </div>
  );
}
export default ToDoList;
