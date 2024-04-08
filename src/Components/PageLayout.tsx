import { Layout } from "antd"
import { Navbar } from "./Navbar"
import { Content } from "antd/es/layout/layout"

export const PageLayout = ({
  children,
  isHome,
}: {
  isHome?: boolean
  children: React.ReactNode
}) => (
  <Layout className="layout" style={{ minHeight: "100vh" }}>
    <Content>
      <Navbar isHome={isHome ?? false} />
      {children}
    </Content>
  </Layout>
)
