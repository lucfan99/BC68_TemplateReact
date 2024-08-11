import React from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import { pathDefault } from "../common/path";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPages from "../pages/Login/LoginPages";
import ListJobPage from "../pages/ListJobPage/ListJobPage";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [
        {
          path: pathDefault.listJob,
          element: <ListJobPage />,
        },
      ],
    },
    {
      path: pathDefault.register,
      element: <RegisterPage />,
    },
    {
      path: pathDefault.login,
      element: <LoginPages />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
