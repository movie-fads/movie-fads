import React, { useState } from "react";
import MainContainer from "./containers/MainContainer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import { UserDataContext } from "./context.js"


const App = () => {
  const [ userData, setUserData ] = useState(null);

  return (
    <BrowserRouter>
    <UserDataContext.Provider value={[ userData, setUserData ]} >
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/app" element={<MainContainer />} />
      </Routes>
    </UserDataContext.Provider> 
    </BrowserRouter>
  );
};

export default App;
