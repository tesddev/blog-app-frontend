import { Layout, Menu, Card } from "antd";
import { SettingOutlined, DashboardOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useDashboard from "../../customHooks/useDashboard";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const HomePage = () => {
  const { blogs, loading } = useDashboard();
  const userName = sessionStorage.getItem("userName") || "User";
  const navigate = useNavigate();
  const handleReadMore = (postId) => {
    console.log(`Navigating to full post with ID: ${postId}`);
    navigate(`/posts/${postId}`);
  };
  const { userRole } = useContext(UserContext);

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
                <h2 className="text-center">Total Blogs: {blogs.length}</h2>
                <div style={{ marginTop: "20px" }}>
                  {blogs.map((blog) => (
                    <Card
                      key={blog.postId}
                      title={blog.title}
                      style={{ marginBottom: "16px" }}
                    >
                      <p>{blog.postPreview}</p>
                      <button
                        style={{
                          marginTop: "8px",
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
