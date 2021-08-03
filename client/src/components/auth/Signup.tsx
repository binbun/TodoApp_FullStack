import React from "react";
import axios from "axios";

interface SignupProps {
  renderLogin: () => void;
}

const Signup = ({ renderLogin }: SignupProps) => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [adminCode, setAdminCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [validateError, setValidateError] = React.useState('');

  const onSubmit = () => {
    if(username.length === 0) {
      setValidateError('Enter your name!');
    } else if(!validateEmail(email)) {
      setValidateError('Your email is not valid!');
    } else if(!validatePassword(password)) {
      setValidateError('Your password is not valid!');
    } else if(confirmPassword !== password) {
      setValidateError('Your password is not match!');
    }else {
      axios.post('/signup', {
        username: username,
        email: email,
        password: password,
        adminCode: adminCode
      }).then(res => {
        window.location.href = '/';
      });
    }
  }

  const validateEmail = (text: string) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text);
  }

  const validatePassword = (text: string) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(text);
  }

  React.useEffect(() => {
    if (password.length === confirmPassword.length) setDisabled(false);
    else setDisabled(true);
  }, [password, confirmPassword])

  return (
    <div style={{ height: '400px' }}>
      <h1 className="text-center text-green-400 font-bold">signup</h1>
      <div className="mb-4">
        <label>username</label>
        <input onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="text" placeholder="username" />
      </div>
      <div className="mb-4">
        <label>email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="text" placeholder="username" />
      </div>
      <div className="mb-4">
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password" />
      </div>
      <div className="mb-4">
        <label>confirm password</label>
        <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password" />
      </div>
      <div className="mb-4">
        <label>admin code</label>
        <input onChange={(e) => setAdminCode(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password" />
      </div>
      <div>
        <span className="text-green-300">{validateError}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>Already a member? <span className="text-green-400 cursor-pointer" onClick={renderLogin}>Login</span></p>        </div>
        <button className={`rounded-lg px-6 py-3 font-bold text-white ${disabled ? "bg-gray-400" : "bg-green-400"}`} disabled={disabled} onClick={() => onSubmit()}>Signup</button>
      </div>

    </div>
  )
}

export default Signup;