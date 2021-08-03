import React from "react";
import axios from "axios";
import { User } from '../../interfaces/todosInterface';

interface LoginProps {
  renderSignup: () => void;
}
const Login = ({ renderSignup }: LoginProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validateError, setValidateError] = React.useState("");

  const onSubmit = () => {
    try {
      if(!validateEmail(email)) {
        setValidateError("Email is not valid")
      } else if(password.length === 0) {
        setValidateError("Enter your password")
      } else {
        axios.post('/login', {
          email: email,
          password: password
        }).then(res => {
          // sucessful, save the token
          console.log(res);
          
          if (res.status === 200) {
            const token = res.data.token;
            const user: User = res.data.user;
  
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
  
            user.isAdmin ? window.location.href = '/admin' : window.location.href = '/dashboard';
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validateEmail = (text: string) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text);
  }


  return (
    <div style={{ height: '400px' }}>
      <h1 className="text-center text-green-400 font-bold">login</h1>
      <div className="mb-4">
        <label>email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="text" placeholder="username" />
      </div>
      <div className="mb-4">
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password" />
      </div>
      <div>
        <span className="text-green-300">{validateError}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>No account? <span className="text-green-400 cursor-pointer" onClick={renderSignup}>Signup</span></p>        </div>
        <button className="rounded-lg px-6 py-3 font-bold bg-green-400 text-white" onClick={() => onSubmit()}>Login</button>
      </div>
    </div>
  )
}

export default Login;