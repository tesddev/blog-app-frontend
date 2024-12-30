import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance.config";
import { endpoints } from "../api/endpoints";
import useNotification from "./useNotification";
import { useNavigate } from "react-router-dom"

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { onNotify } = useNotification();
  const navigate = useNavigate()

  // function to call for login
  const onLogin = async (request) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        endpoints.auth.login,
        request
      );
      setLoading(false);

      if (response.data?.succeeded) {
        const { token, userName } = response.data.resultData;
        onNotify("success", "Successful", response?.data?.message);

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userName", userName);

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      } else {
        onNotify("error", "Error occured", response?.data?.responseMessage);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      onNotify("error", "Error occured", error.response?.data?.responseMessage);
    }
  };

  return {
    onLogin,
    loading,
  };
};

export default useLogin;
