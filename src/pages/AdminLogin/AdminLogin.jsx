import React, { useContext } from "react";
import InPutCustom from "../../components/Input/InPutCustom";
import { Input } from "antd";
import { useFormik } from "formik";
import Password from "antd/es/input/Password";
import { authService } from "../../services/auth.service";
import { getLocalStorage, setLocalStorage } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NotifycationContext } from "../../App";
import { setValueUser } from "../../redux/authSlice";
import { pathDefault } from "../../common/path";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotifycationContext);
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        const result = authService
          .signIn(values)
          .then((res) => {
            console.log(res);
            //Kiểm tra xem người đăng nhập có phải là user ko
            if (res.data.content.role == "USER") {
              //B1: THÔNG Báo người dùng ko đc phép đăng nhập vào hệ thống
              handleNotification("Bạn KHÔng được phép truy cập", "error");
              let viPham = getLocalStorage("viPham");
              if (!viPham) {
                setLocalStorage("viPham", 1);
              } else {
                viPham++;
                viPham == 3
                  ? (window.location.href = "https://google.com")
                  : setLocalStorage("viPham", viPham);
              }
            } else {
              setLocalStorage("user", res.data.content);
              dispatch(setValueUser(res.data.content));
              localStorage.removeItem("viPham");
              navigate(pathDefault.admin);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // validationSchema:
    });

  return (
    <div>
      <div className="container">
        <div className="admin_login h-screen flex">
          <div className="admin_login_animation w-1/2"></div>
          <div className="admin_login_form w-1/2 flex flex-col justify-center">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold text-center">
                Trang đăng nhập cho admin
              </h1>
              <InPutCustom
                contentLable="Email"
                value={values.email}
                name={"email"}
                onChange={handleChange}
              />
              <InPutCustom
                contentLable="Password"
                value={values.password}
                type="password"
                name={"password"}
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  className="py-2 px-5 bg-black  text-white rounded-lg inline-block w-full"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
