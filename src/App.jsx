import React from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const NotifycationContext = React.createContext();

function App() {
  const handleNotification = (content, type) => {
    toast[type](content, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };
  const routes = useRoutesCustom();
  return (
    <NotifycationContext.Provider value={{ handleNotification }}>
      {routes}
      <ToastContainer />
    </NotifycationContext.Provider>
  );
}

export default App;
