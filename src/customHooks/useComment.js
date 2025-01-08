import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance.config";
import { endpoints } from "../api/endpoints";
import useNotification from "./useNotification";
import { useNavigate } from "react-router-dom"

const useComment = () => {
  const [loading, setLoading] = useState(false);
  const { onNotify } = useNotification();
  const navigate = useNavigate();

  const onComment = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        endpoints.comments.postComment,
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("***")}`,
          },
        }
      );
      setLoading(false);

      if (response.data?.succeeded) {
        onNotify("success", "Comment Added Successfully", response?.data?.message);

        setTimeout(() => {
          navigate(`/posts/${payload.postId}`, { replace: true });
        }, 2000);
      } else {
        onNotify("error", "Error Occurred", response?.data?.responseMessage || "Something went wrong.");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      onNotify("error", "Error Occurred", error.response?.data?.responseMessage || "Unable to add comment.");
    }
  };

  return {
    onComment,
    loading,
  };
};

export default useComment;