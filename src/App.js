import "./App.css";
import Navbar from "./components/Navbar";
import MyRouter from "./components/MyRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <MyRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
