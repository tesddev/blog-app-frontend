import { Route, Routes } from "react-router-dom";
import { App as AntApp } from "antd"; // Import Ant Design's App component
import Product from "./views/Post/Post";
import Details from "./views/HomePage/DetailsPage"
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/HomePage/HomePage";
import Settings from "./views/settings/Settings";

const App = () => {
  return (
    <AntApp>
      <Routes>
        <Route path="/post-blog" element={<Product />} />
        <Route path="/posts/:postId" element={<Details />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </AntApp>
  );
};

export default App;
