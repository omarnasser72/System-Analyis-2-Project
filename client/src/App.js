import "./style/App.css";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
