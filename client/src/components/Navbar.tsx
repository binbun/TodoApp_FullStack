import React from "react";
import Logout from "./auth/Logout";
import { User } from "../interfaces/todosInterface"
// import Profile from '../pages/Profile'
import { useHistory } from "react-router";

const Navbar = () => {
  const user: User = JSON.parse(localStorage.getItem('user')!);
  const history = useHistory();

  const onHandleLogoClick = () => {
    if(!user.isAdmin) {
      history.push('/dashboard')
    }
  }

  const onHandleProfileClick = () => {
    if(!user.isAdmin) {
      history.push('/profile')
    }
  }
  
  return(
    <div className="flex justify-between bg-green-400 p-8 text-white">
      <p className="font-bold text-lg cursor-pointer" onClick={onHandleLogoClick}>MERN TODO</p>
      <div className="float-right flex space-x-8">
        <p onClick={onHandleProfileClick} className="cursor-pointer">{user.username}</p>
        <Logout />
      </div>
    </div>
  )
}

export default Navbar;