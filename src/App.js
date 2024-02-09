import "./App.css";
import Navbar from "./components/Navbar";
import MyRouter from "./components/MyRouter";
import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
export const userContext = React.createContext();
const App = () => {
  const [user, setUser] = useState(false);
  return (
    <>
      <userContext.Provider value={{ setUser, user }}>
        <BrowserRouter>
          <Navbar />
          <MyRouter />
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
};

export default App;
