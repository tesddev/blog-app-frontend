import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../api/axiosInstance.config";
import useNotification from "./useNotification";
import { endpoints } from "../api/endpoints";

const useDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const { onNotify } = useNotification();

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const blogResponse = await axiosInstance.get(endpoints.dashboard.blogs, {
        headers: {
          Authorization: endpoints.bearerToken,
        },
      });

      if (blogResponse.data?.succeeded) {
        setBlogs(blogResponse.data?.resultData || []);
      } else {
        onNotify("error", "Failed to load blogs");
      }
    } catch (error) {
      console.error(error);
      onNotify("error", "Error occurred while fetching dashboard data", error.response?.data?.responseMessage);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only run once after initial mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refetchBlogs = async () => {
    await fetchDashboardData();
  };

  return {
    loading,
    blogs,
    refetchBlogs
  };
};

export default useDashboard;
