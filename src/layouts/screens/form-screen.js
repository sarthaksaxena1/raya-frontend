import { Card, Row, Col } from "antd";

export const FormScreenLayout = ({ children, formTitle, formWidth = 12 }) => {
  return (
    <Card className="rounded-xl mt-8 shadow-md" title={formTitle}>
      <Row className="max-h-450 overflow-y-auto">
        <Col xs={formWidth}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};
