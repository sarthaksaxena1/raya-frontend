import { MobileFormScreenLayout } from "../../layouts/mobile-form-screen";
import { CommonLayout } from "../../layouts/common";
import useWindowDimensions from "../../helpers/window-dimensions";

const RegisterationLayout = ({ children }) => {
  const { isMobile } = useWindowDimensions();

  if (isMobile) {
    return <MobileFormScreenLayout>{children}</MobileFormScreenLayout>;
  }
  return <CommonLayout>{children}</CommonLayout>;
};

export default RegisterationLayout;
