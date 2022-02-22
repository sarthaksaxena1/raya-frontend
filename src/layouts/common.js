import { Card, Row, Col } from "antd";

export const CommonLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen pt-20 pb-16 flex flex-col items-center bg-opacity-30 bg-gray-100 overflow-y-hidden">
      <Card className="max-w-md w-10/12 rounded-xl text-xl">
        <img src="/raya_logo.png" alt="raya logo" className="mx-auto" />
        <Row>
          <Col xs={24}>{children}</Col>
        </Row>
      </Card>
    </div>
  );
};
