import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
};

export default MyRouter;
