import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance.config";
import { endpoints } from "../api/endpoints";
import useNotification from "./useNotification";

const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);
  const { onNotify } = useNotification();

  const onDeleteComment = async (commentId) => {
    setLoading(true);
    try {
        console.log(commentId)
      const response = await axiosInstance.delete(
        `${endpoints.comments.deleteComment}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("***")}`,
          },
        }
      );

      setLoading(false);

      if (response.data?.succeeded) {
        onNotify("success", "Comment Deleted Successfully");
      } else {
        onNotify("error", "Error Occurred", response?.data?.responseMessage || "Something went wrong.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      onNotify("error", "Error Occurred", error.response?.data?.responseMessage || "Unable to delete comment.");
    }
  };

  return {
    onDeleteComment,
    loading,
  };
};

export default useDeleteComment;

  