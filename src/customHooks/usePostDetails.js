import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../api/axiosInstance.config";
import { endpoints } from "../api/endpoints";
import useNotification from "./useNotification";

const usePostDetails = () => {
  const [loading, setLoading] = useState(false);
  const { onNotify } = useNotification();

  // Function to fetch post details
  const fetchPostDetails = useCallback(
    async (postId) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`${endpoints.post.getPostDetails}/${postId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("***")}`,
            "Content-Type": "application/json",
          },
        });

        console.log(`Post details response: ${JSON.stringify(response.data)}`);

        if (response.data?.succeeded) {
          return response.data.resultData;
        } else {
          onNotify("error", "Error occurred", response?.data?.message || "Failed to fetch post details");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    // Only run once after initial mount
    useEffect(() => {
        fetchPostDetails();
    }, [fetchPostDetails]);

  return { loading, fetchPostDetails };
};

export default usePostDetails;