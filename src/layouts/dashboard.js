import { Layout } from "antd";

import { useState } from "react";
import { AdminMenu } from "../components/menu/admin-menu";

const { Content, Sider } = Layout;

export const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        // collapsible={true}
        collapsed={collapsed}
        onCollapse={onCollapse}
        className="transition-all duration-300"
      >
        {collapsed ? (
          <div className="m-4">
            <img src="/raya_logo.png" alt="Raya Clinic" />
          </div>
        ) : (
          <div className="h-24 m-4">
            <img src="/raya_logo.png" alt="Raya Clinic" />
          </div>
        )}
        <AdminMenu />
      </Sider>
      <Layout>
        <Content className="mx-4 my-4">{children}</Content>
      </Layout>
    </Layout>
  );
};
