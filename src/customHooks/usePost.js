// import { useState, useEffect, useCallback } from "react";
import { useState, useCallback } from "react";
import { axiosInstance } from "../api/axiosInstance.config";
import { endpoints } from "../api/endpoints";
import useNotification from "./useNotification";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const { onNotify } = useNotification();

  const postBlog = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(endpoints.post.postBlog, data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("***")}`,
            "Content-Type": "application/json",
          },
        });
        console.log(`see res ${response}`)

        if (response.data?.succeeded) {
          onNotify("success", "Success", response.data?.resultData || "Blog posted successfully");
          return response.data.resultData;
        } else {
          onNotify("error", "Error occurred", response?.data?.resultData || "Failed to post blog");
        }
      } catch (error) {
        console.error(error);
        onNotify("error", "Error occurred", error.response?.data?.message || "Failed to post blog");
      } finally {
        setLoading(false);
      }
    },
    [onNotify]
  );

  return { loading, postBlog };
};

export default usePost;