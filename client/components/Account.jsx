import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { UserDataContext } from "../context.js"

const Account = () => {
  const navigate = useNavigate()
  const [ userData, setUserData ] = useContext(UserDataContext);

  const handleLogout = () => {
    console.log('logging out user:', userData);
    setUserData('');

    document.cookie = "secret= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    
    navigate('/'); 
  }

  return (
    <div>Account
    <h3>{userData.name}</h3>    
    <img src={userData.picture} alt="userPix"/>
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Account;
