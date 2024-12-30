import { Card, Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import useRegister from "../customHooks/useRegister";
import { useState } from "react";

const Register = () => {
  const { onRegister, loading } = useRegister();
  const [isAuthor, setIsAuthor] = useState(false);

  const handleFormSubmit = (values) => {
    const role = isAuthor ? "Author" : "Reader";
    onRegister({ ...values, role });
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-[#f5f5f5]">
      <Card className="max-w-[30rem] w-[90%]">
        <h1 className="font-bold text-center text-2xl">Fulcrum Footwear</h1>
        <h2 className="font-bold text-center text-2xl">Registration Form</h2>
        <Form
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Full name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Email is required" },
              {
                type: "email",
                message: "Invalid email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password not strong enough",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={isAuthor}
              onChange={(e) => setIsAuthor(e.target.checked)}
            >
              I am an author
            </Checkbox>
          </Form.Item>
          <Button type="primary" loading={loading} htmlType="submit" block>
            Register
          </Button>
          <div className="my-10 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-[#1677ff]">
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
