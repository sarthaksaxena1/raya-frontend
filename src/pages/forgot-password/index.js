import { Form, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import RegisterationLayout from "../../layouts/hybrid/registeration-layout";
import { userForgotPassword } from "../../appRedux/actions/Authentication";
import { useHistory, Link } from "react-router-dom";
import { showMessage } from "../../helpers/message";

const PatientForgotPassword = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(
      userForgotPassword(values, () => {
        showMessage("success", "New credentials have been mailed!");
        history.push("/login");
      })
    );
  };

  const inputStyleClass = "w-full rounded-md h-14 shadow-md";

  return (
    <RegisterationLayout>
      <h3 className="text-center mt-8">Forgot Password</h3>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        className="pt-8"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please Enter Your Email",
            },
          ]}
        >
          <Input className={inputStyleClass} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item className="mb-2">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 text-xl rounded-md"
          >
            Submit
          </Button>
        </Form.Item>
        <p className="text-lg text-gray-900 ">
          Go Back to Login?
          <Link className="text-lg text-blue-500 pl-2" to="/login">
            Login
          </Link>
        </p>
      </Form>
    </RegisterationLayout>
  );
};

export default PatientForgotPassword;
