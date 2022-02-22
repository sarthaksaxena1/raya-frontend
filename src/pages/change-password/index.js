import { Form, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userChangePassword } from "../../appRedux/actions/Authentication";
import { showMessage } from "../../helpers/message";
import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";

const ChangePassword = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    const { old_password, new_password } = values;
    dispatch(
      userChangePassword({ old_password, new_password }, () => {
        showMessage("success", "Password changed successfully!");
        history.push("/logout");
      })
    );
  };
  const inputStyleClass = "w-full rounded-md h-14 shadow-sm ";

  return (
    <MobilePagesScreenLayout
      pageTitle="Change Password"
      userIcon={false}
      showRayaLogo={false}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        className="pt-8"
      >
        <Form.Item
          name="old_password"
          rules={[
            {
              required: true,
              message: "Please Enter old password",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|\W))(?=.*[^\w\d]).{8,}$/,
              message:
                "Password must be atleast 8 characters and must include atleast 1 uppercase, 1 lowercase, 1 number and 1 special character",
            },
          ]}
        >
          <Input.Password
            className={inputStyleClass}
            type="password"
            placeholder="Enter your Old password"
          />
        </Form.Item>

        <Form.Item
          name="new_password"
          rules={[
            {
              required: true,
              message: "Please enter your new password",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|\W))(?=.*[^\w\d]).{8,}$/,
              message:
                "Password must be atleast 8 characters and must include atleast 1 uppercase, 1 lowercase, 1 number and 1 special character",
            },
          ]}
        >
          <Input.Password
            className={inputStyleClass}
            type="password"
            placeholder="Enter your New password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["new_password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className={inputStyleClass}
            type="password"
            placeholder="Re-Enter your New password"
          />
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
      </Form>
    </MobilePagesScreenLayout>
  );
};

export default ChangePassword;
