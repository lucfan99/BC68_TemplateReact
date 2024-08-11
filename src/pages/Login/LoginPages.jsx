import React, { useContext } from "react";
import signInAnimation from "./../../assets/animation/loginAnimation.json";
import { useLottie } from "lottie-react";
import InPutCustom from "../../components/Input/InPutCustom";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../services/auth.service";
import { notiValidation } from "../../common/notiValidation";
import { setLocalStorage } from "../../utils/utils";
import { setValueUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { NotifycationContext } from "../../App";
const LoginPages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleNotification } = useContext(NotifycationContext);
  const options = {
    animationData: signInAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  //NV1 : KHAI BÁO formik trong login page và  thực hiện lấy dữ liệu người dùng khi nhấn đn
  //NV2: Thưc hiện validation dữ liệu của 2 input thông qua :1. 2 input đều pải nhập dữ liệu, input email phải ktra xem phải email ko, còn input mk ktra tối thiểu 6 kí tự, tối đa 10 ký tự
  //nv3: Thưc hiện tạo một phương thức mới trong authService quản lý đăng nhập
  //nv4: Thực hiện sử dụng phương thức vừa tạo kết hợp dữ liệu người dùng để gửi cho BE ktra và nhận kết quả
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const result = await authService.signIn(values);
        console.log(result);
        //b: Lưu trữ dl xuống localstrogare
        setLocalStorage("user", result.data.content);
        dispatch(setValueUser(result.data.content));
        //b2 chuyển hướng người dùng
        handleNotification(
          "Đăng nhập thành công, bạn sẽ dc chuyển hướng về trang chủ",
          "success"
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.log(error);
        handleNotification(error.response.data.content, "error");
      }
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required(notiValidation.empty)
        .email(notiValidation.email),
      password: yup.string().required(notiValidation.empty).min("6").max("10"),
    }),
  });
  return (
    <div>
      <div className="container">
        <div className="loginPage_content h-screen flex items-centers">
          <div className="loginPage_img w-1/2 ">{View}</div>
          <div className="loginPage_form w-1/2 px-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h1 className="font-medium text-4xl text-center">
                Giao diện đăng nhập
              </h1>
              <InPutCustom
                contentLable={"Email"}
                value={values.email}
                name={"email"}
                onChange={handleChange}
                placeHolder={"Vui lòng nhập email"}
                error={errors.email}
                touched={touched.email}
                onBlur={handleBlur}
              />

              <InPutCustom
                contentLable={"Paswork"}
                onChange={handleChange}
                value={values.password}
                name={"password"}
                placeHolder={"Nhập mật khẩu"}
                error={errors.password}
                touched={touched.password}
                type="password"
                onBlur={handleBlur}
              />

              <div>
                <button
                  type="submit"
                  className="bg-black text-white inline-block w-full py-3 px-5 rounded-md"
                >
                  Đăng nhập
                </button>
                <Link className="text-blue-700 mt-5 hover:underline inline-block">
                  Chưa tạo tài khoản Nhấn zô đây
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
