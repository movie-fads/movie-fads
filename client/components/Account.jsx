import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserDataContext } from "../context.js";

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserDataContext);

  const handleLogout = () => {
    setUserData("");
    document.cookie = "secret= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    navigate("/");
  };

  return (
    <div className="AccContainer">
      <h2 className="acctext">Account</h2>
      <h3>{userData.name}</h3>
      <img src={userData.picture} alt="userPix" />
      <div className="btnLogout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
