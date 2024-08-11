import React, { useContext } from "react";
import InPutCustom from "../Input/InPutCustom";
import { DatePicker, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";

import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { NotifycationContext } from "../../App";
import { useNavigate } from "react-router-dom";
const FormRegister = () => {
  const { handleNotification } = useContext(NotifycationContext);
  const navigate = useNavigate();
  //NV1: Thực hiện bóc tách ra các thuộc tính values, errors, handleChange, handleBlur, handleSubmit, touched để setup vào các field của form
  //nv2: thực hiện khai báo các initialValues sẽ có cho formik và thực hiện kt nhập dữ liệu vào xem ónubmit có lấy đc dữ liệu tất cả form ?
  //nv3:

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    onSubmit: (values) => {
      console.log(values);
      authService
        .signUp({ ...values, gender: values.gender == "Nam" ? true : false })
        .then((res) => {
          console.log(res);
          handleNotification("Chúc mùng tạo tài khoản thành công", "success");
          setTimeout(() => {
            navigate("/dang-nhap");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data.content, "error ");
        });
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, "Vui lòng nhập tên ko chứa số"),
      email: yup
        .string()
        .required(notiValidation.empty)
        .email(notiValidation.email),
      password: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(?=.*[A-Z])(?=.*\d).+$/,
          "Vui lòng nhập ít nhất 1 chữ cái và viết hoa"
        ),
      phone: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Vui lòng nhập đúng sdt"),
      birthday: yup.string().required(notiValidation.empty),
      gender: yup.string().required(notiValidation.empty),
    }),
  });

  return (
    <div className="flex items-center justify-center flex-col h-full ">
      <h1>Form Đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap ">
          <InPutCustom
            contentLable={"Họ tên"}
            name={"name"}
            classWrapper="w-1/2 p-3"
            placeHolder="Vui lòng nhập tên"
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.name}
            touched={touched.name}
            value={values.name}
          />
          <InPutCustom
            contentLable={"Email"}
            name={"email"}
            value={values.email}
            placeHolder="Vui lòng nhập email"
            classWrapper="w-1/2 p-3"
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.email}
            touched={touched.email}
          />
          <InPutCustom
            contentLable={"Mật khẩu"}
            onChange={handleChange}
            value={values.password}
            placeHolder="Vui lòng nhập mật khẩu"
            classWrapper="w-full p-3"
            name={"password"}
            type={"password"}
            error={errors.password}
            touched={touched.password}
          />
          <InPutCustom
            onChange={handleChange}
            value={values.phone}
            contentLable="Số điện thoại"
            name={"phone"}
            placeHolder="Vui lòng nhập số điện thoại"
            classWrapper="w-1/3 p-3"
            error={errors.phone}
            touched={touched.phone}
          />
          <div className="w-1/3 p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ngày sinh
            </label>
            <DatePicker
              onChange={(dayjs, dateString) => {
                setFieldValue("birthday", dateString);
              }}
              format={"DD-MM-YYYY"}
              className="w-full"
            />
            {errors.birthday && touched.birthday ? (
              <p className="text-red-500">{errors.birthday}</p>
            ) : null}
          </div>
          <div className="w-1/3 p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Giới tính
            </label>
            <select
              onChange={handleChange}
              value={values.gender}
              name={"gender"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Vui lòng chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
            {errors.gender && touched.gender ? (
              <p className="text-red-500">{errors.gender}</p>
            ) : null}
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="py-3 px-6 bg-black text-white rounded-md w-full"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
