import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance.config";
import { endpoints } from "../api/endpoints";
import useNotification from "./useNotification";

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const { onNotify } = useNotification();

  const onDeletePost = async (postId) => {
    setLoading(true);
    try {
      console.log(postId);
      const response = await axiosInstance.delete(
        `${endpoints.post.deletePost}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("***")}`,
          },
        }
      );

      setLoading(false);

      if (response.data?.succeeded) {
        onNotify("success", "Post Deleted Successfully");
      } else {
        onNotify("error", "Error Occurred", response?.data?.responseMessage || "Something went wrong.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      onNotify("error", "Error Occurred", error.response?.data?.responseMessage || "Unable to delete post.");
    }
  };

  return {
    onDeletePost,
    loading,
  };
};

export default useDeletePost;
