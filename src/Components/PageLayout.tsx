import { Layout } from "antd"
import { Navbar } from "./Navbar"
import styled, { keyframes } from "styled-components"

export const PageLayout = ({
  disableHomeLink: isHome,
  children,
}: {
  disableHomeLink?: boolean
  children: React.ReactNode
}) => (
  <Layout className="layout" style={{ minHeight: "100vh" }}>
    <Layout.Content>
      <Navbar disableHomeLink={isHome ?? false} />
      {children}
    </Layout.Content>
    <Layout.Footer>
      <Hey>👋</Hey>
    </Layout.Footer>
  </Layout>
)

const wave = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const Hey = styled.span`
  font-size: 2em;
  margin: 0 0.5em;
  animation-name: ${wave};
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  transform-origin: 70% 70%;
  display: inline-block;
  cursor: default;

  &:hover {
    animation-iteration-count: infinite;
  }
`
