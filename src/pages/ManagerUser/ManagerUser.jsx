import React, { useContext, useEffect } from "react";
import { Space, Table, Tag } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotifycationContext } from "../../App";
import { getValueUserAPI } from "../../redux/nguoiDungSlice";

//Thực hiện tạo 1 service dùng quản lý các api của người dùng
// Cấu hình 1 phương thức dùng để xóa người dùng trong hệ thống khi gọi tới phương thức cần truyền id của người dùng đang muốn xóa
// sau khi đã cấu hình phương thức, quay trở lại component mângeruser và xử lý tạo sự kiện click tương tác với nút xóa người dùng

const ManagerUser = () => {
  const { handleNotification } = useContext(NotifycationContext);
  const dispatch = useDispatch();
  const { listUsers } = useSelector((state) => state.nguoiDungSlice);
  console.log(listUsers);
  useEffect(() => {
    dispatch(getValueUserAPI());
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => {
        return <img className="h-14" src={text} alt="" />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text) => (
        <Tag color={text ? "blue" : "cyan"}>{text ? "Nam" : "Nữ"}</Tag>
      ),
    },
    //USER || ADMIN
    {
      title: "ROLE",
      dataIndex: "role",
      render: (text) => (
        <Tag color={text == "ADMIN" ? "geekblue-inverse" : "lime-inverse"}>
          {text}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              nguoiDungService
                .xoaNguoiDung(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  dispatch(getValueUserAPI());
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  dispatch(getValueUserAPI());
                });
            }}
            className="bg-red-500 text-white py-2 px-5 rounded-md duration-300 hover:bg-red-500/90"
          >
            Xóa
          </button>
          <button className="bg-yellow-500 text-white py-2 px-5 rounded-md duration-300 hover:bg-yellow -500/90">
            Sửa
          </button>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={listUsers} />;
};
export default ManagerUser;
