import React from "react";
import logoHeader from "./../../assets/svg/logoHeader.svg";
import { Link } from "react-router-dom";
import IconLogoHeader from "./../icon/IconLogoHeader";
import { pathDefault } from "../../common/path";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import "./header.scss";
import LinkCustom from "../LinkCustom/LinkCustom";
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";
const Header = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  return (
    <header className="py-5">
      <div className="container">
        <div className="header_content flex items-center justify-between">
          <div className="header_logo flex items-center space-x-4">
            <Link to={pathDefault.homePage}>
              {/* <img src={logoHeader} alt="logo" /> */}
              <IconLogoHeader />
            </Link>
            <FormSearchProduct />
          </div>
          <nav className="header_navigation space-x-5">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className="cursor-pointer py-3 px-4 rounded-md hover:bg-gray-100 duration-300"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Hover me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <button>English</button>
            <a href="#">Become a Seller</a>
            <LinkCustom
              content={"Đăng Nhập"}
              to={pathDefault.login}
              className={"border border-green-600 text-green-600"}
            />
            <LinkCustom
              content={"Đăng Ký"}
              to={pathDefault.register}
              className={"text-white bg-green-600"}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
