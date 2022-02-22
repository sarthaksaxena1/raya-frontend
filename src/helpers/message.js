import { message, notification } from "antd";

export function showMessage(type, msgTxt) {
  switch (type) {
    case "success":
      notification.success({
        message: <span className="mt-4 text-lg">{msgTxt}</span>,
      });
      break;

    case "error":
      notification.error({
        message: <span className="mt-4 text-lg">{msgTxt}</span>,
      });
      break;

    case "info":
      message.info(msgTxt);
      break;

    case "warning":
      message.warning(msgTxt);
      break;

    case "loading":
      message.loading(msgTxt);
      break;

    default:
      message.info(msgTxt);
  }
}
