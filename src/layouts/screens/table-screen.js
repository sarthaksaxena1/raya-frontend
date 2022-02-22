import { Card } from "antd";

export const TableScreenLayout = ({ children, tableTitle }) => {
  return (
    <Card
      title={tableTitle ? tableTitle : ""}
      className="rounded-xl mt-4 shadow-md raya-table-card"
    >
      {children}
    </Card>
  );
};
