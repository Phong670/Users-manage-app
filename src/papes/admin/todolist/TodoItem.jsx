import {  Form, Button, Input,  Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToDoAction } from "../../../redux/actions/todolist.action";
import { editToDoAction } from "../../../redux/actions/todolist.action";



let idEdit = null;

let indexIdClone = null;
let valueItemEdit = null;
function ToDoListItem({ data }) {
  const dispatch = useDispatch();

  const [editForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valuesHandle, setValuesHandle] = useState({});
  const [todoListOther, setTodoListOther] = useState([]);

  const [errorAlert, setErrorAlert] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (todoListOther.find((item) => item.name === valuesHandle.name)) {
      setErrorAlert(
        `Error white editing User: Unable to edit. A User with name ${valuesHandle.name} already exits`
      );
      setShowErrorAlert(true);
    } else {
      dispatch(editToDoAction({ id: idEdit, values: valuesHandle }));

      setIsModalOpen(false);
      setErrorAlert("");
    }
  };

  const handleCancel = () => {
    editForm.setFieldsValue({
      id: valueItemEdit?.id,
      name: valueItemEdit?.name,
      age: valueItemEdit?.age,
      salary: valueItemEdit?.salary,
    });
    setIsModalOpen(false);
    setShowErrorAlert(false);
    setErrorAlert("");
  };

  const { todoList } = useSelector((state) => state.todo);
  useEffect(() => {
    setTodoListOther([...todoList]);
  }, [todoList]);

  useEffect(() => {
    setTodoListOther([...todoList]);
    todoListOther.splice(indexIdClone, 1);

    valueItemEdit = todoList[indexIdClone];
    editForm.setFieldsValue({
      id: valueItemEdit?.id,
      name: valueItemEdit?.name,
      age: valueItemEdit?.age,
      salary: valueItemEdit?.salary,
    });
    setValuesHandle({ ...valueItemEdit });
  }, [idEdit]);

  const getValues = (e) => {
    return e.target.value;
  };

  const columns = [
    {
      title: "Id",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <button
            className="bg-[#1eb18d] p-2 rounded-md"
            onClick={() => {
              idEdit = record.id;
              indexIdClone = todoList.findIndex((item) => item.id === idEdit);

              showModal();
            }}
          >
            Edit
          </button>
          <button
            className="bg-[#e98228] p-2 rounded-md"
            onClick={() => {
              dispatch(removeToDoAction({ id: record.id }));
            }}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  const renderFormEdit = () => {
    console.log("render form");
    return (
      <>
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
            span: 3,
          }}
          style={{
            width: "100%",
          }}
          form={editForm}
          onFinish={() => {}}
          onChange={() => {
            setShowErrorAlert(false);
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
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
                setShowErrorAlert(false);
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
              offset: 16,
            }}
          >
            <Button htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="mx-[10px]" onClick={handleOk}>
              Edit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Modal
        title="Edit"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div>{renderFormEdit()}</div>
      </Modal>
    </div>
  );
}
export default ToDoListItem;
