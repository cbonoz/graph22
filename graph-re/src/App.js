import Home from "./components/Home";
import { Layout } from "antd";
import { APP_NAME } from "./util/constants";

import "antd/dist/antd.css";
import "./App.css";
import logo from "./assets/logo";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <img src={logo} className="header-image" />
        </Header>
        <Content>
          <Home />
        </Content>
        <Footer>{APP_NAME} &copy;2022</Footer>
      </Layout>
    </div>
  );
}

export default App;
