import { Layout, Menu } from "antd";
import { APP_NAME } from "./util/constants";

import { Routes, Route, Link, Router } from "react-router-dom";
import PropertyMap from "./components/PropertyMap";
import UploadPage from "./components/UploadPage";

import logo from "./assets/logo.png";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="0">
              <img src={logo} className="header-image" />
            </Menu.Item>
            <Menu.Item key="1">Search</Menu.Item>
            <Menu.Item key="2">Upload</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<PropertyMap />} />
            <Route path="about" element={<UploadPage />} />
          </Routes>
        </Content>
        <Footer>{APP_NAME} &copy;2022</Footer>
      </Layout>
    </div>
  );
}

export default App;