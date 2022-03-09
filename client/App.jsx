import React from "react";
import MainContainer from "./containers/MainContainer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/app" element={<MainContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
