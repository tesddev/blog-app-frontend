import "./styling/product.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Input } from "antd";
import { DashboardOutlined, SettingOutlined, EditOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { UserContext } from "../../context/UserContext.jsx";

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;
const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePost = () => {
    const id = blogs.length + 1;
    const addBlog = { ...newBlog, id };
    setBlogs([...blogs, addBlog]);
    setNewBlog({ title: "", content: "" });
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
  };

  const inputStyle = {
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "whitesmoke",
  };

  const { userRole } = useContext(UserContext);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" style={{ color: "#fff", textAlign: "center", padding: "20px 0" }}>
          Blog Page
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Home Page</Link>
          </Menu.Item>
          {userRole !== "Reader" && (
            <Menu.Item key="2" icon={<EditOutlined />}>
              <Link to="/products">Post</Link>
            </Menu.Item>
          )}
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: "#fff", textAlign: "center" }}>
          <h1 className="font-bold text-2xl">Create A Post</h1>
        </Header>

        <Content style={{ margin: "16px", padding: "24px", background: "#fff" }}>
          <div className="blog-form">
            <h2>Create New Blog Post</h2>
            <div style={formStyle}>
              <Input
                style={inputStyle}
                type="text"
                name="title"
                placeholder="Blog Title"
                value={newBlog.title}
                onChange={handleInput}
              />
              <TextArea
                style={{ ...inputStyle, height: "200px" }}
                name="content"
                placeholder="Write your blog in Markdown..."
                value={newBlog.content}
                onChange={handleInput}
              />
              <Button type="primary" onClick={handlePost}>
                Post
              </Button>
            </div>
          </div>

          <div className="blog-preview">
            <h2>Preview</h2>
            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "whitesmoke",
              }}
            >
              <ReactMarkdown>{newBlog.content}</ReactMarkdown>
            </div>
          </div>

          <div className="blog-list">
            <h2>Posted Blogs</h2>
            <ul>
              {blogs.map((blog) => (
                <li key={blog.id}>
                  <h3>{blog.title}</h3>
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BlogPost;

