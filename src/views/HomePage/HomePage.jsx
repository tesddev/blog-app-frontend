import { Layout, Menu, Card } from "antd";
import useDashboard from "../../customHooks/useDashboard";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import useDeletePost from "../../customHooks/useDeletePost";
import { Link, useNavigate } from "react-router-dom";
import { DashboardOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const HomePage = () => {
  const { blogs, loading, refetchBlogs } = useDashboard();
  const { onDeletePost, loading: deleteLoading } = useDeletePost();
  const userName = sessionStorage.getItem("userName") || "User";
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);

  const handleReadMore = (postId) => {
    console.log(`Navigating to full post with ID: ${postId}`);
    navigate(`/posts/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await onDeletePost(postId);
      await refetchBlogs();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" style={{ color: "#fff", textAlign: "center", padding: "20px 0" }}>
          Home Page
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Home Page</Link>
          </Menu.Item>
          {userRole !== "Reader" && (
            <Menu.Item key="2" icon={<EditOutlined />}>
              <Link to="/post-blog">Post</Link>
            </Menu.Item>
          )}
          <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: "#fff", textAlign: "center" }}>
          <h1 className="font-bold text-2xl">Welcome, {userName}</h1>
        </Header>

        <Content style={{ margin: "16px" }}>
          <Card className="max-w-[30rem] w-[90%] mx-auto">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <h2 className="text-center">Available Blogs: {blogs.length}</h2>
                <div style={{ marginTop: "20px" }}>
                  {blogs.map((blog) => (
                    <Card
                      key={blog.postId}
                      title={blog.title}
                      style={{ marginBottom: "16px" }}
                    >
                      <p>{blog.postPreview}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                        <button
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#1890ff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleReadMore(blog.postId)}
                        >
                          Read more
                        </button>
                        {userRole === "Admin" && (
                          <button
                            style={{
                              padding: "8px 16px",
                              backgroundColor: "#ff4d4f",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeletePost(blog.postId)}
                            disabled={deleteLoading}
                          >
                            {deleteLoading ? "Deleting..." : "Delete"}
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
