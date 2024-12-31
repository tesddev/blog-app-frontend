import "./styling/product.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Input, Select } from "antd";
import { DashboardOutlined, SettingOutlined, EditOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { UserContext } from "../../context/UserContext.jsx";
import usePost from "../../customHooks/usePost.js";

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const BlogPost = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    categories: [],
    tags: [],
  });

  const { userRole } = useContext(UserContext);
  const { postBlog, loading } = usePost();

  const availableCategories = ["Health", "Technology", "Finance", "Education", "Others"];
  const availableTags = ["Trend", "Tech", "Family", "Others"];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoriesChange = (selectedCategories) => {
    setNewBlog((prev) => ({
      ...prev,
      categories: selectedCategories,
    }));
  };

  const handleTagsChange = (selectedTags) => {
    setNewBlog((prev) => ({
      ...prev,
      tags: [...new Set([...selectedTags])],
    }));
  };

  const handlePost = async () => {
    try {
      const response = await postBlog(newBlog);
      console.log("Blog posted successfully:", response);
      setNewBlog({ title: "", content: "", categories: [], tags: [] });
    } catch (error) {
      console.error("Failed to post blog:", error);
    }
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
              <Link to="/post-blog">Post</Link>
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
              <Select
                mode="multiple"
                style={inputStyle}
                placeholder="Select Categories"
                value={newBlog.categories}
                onChange={handleCategoriesChange}
              >
                {availableCategories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
              <Select
                mode="multiple"
                style={inputStyle}
                placeholder="Select Tags"
                value={newBlog.tags}
                onChange={handleTagsChange}
              >
                {availableTags.map((tag) => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
              <Button type="primary" onClick={handlePost} loading={loading}>
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
              <p>
                <strong>Categories:</strong> {newBlog.categories.join(", ")}
              </p>
              <p>
                <strong>Tags:</strong> {newBlog.tags.join(", ")}
              </p>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BlogPost;