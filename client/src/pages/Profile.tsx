import React from 'react';
import { User, Todo } from '../interfaces/todosInterface';
import Navbar from "../components/Navbar";
import axios from 'axios';

const userStorage: User = JSON.parse(localStorage.getItem('user')!);

const Profile = () => {
  const [user, setUser] = React.useState<User>({
    _id: "",
    username: "",
    email: "",
    isAdmin: false
  });  

  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
      axios.get('/user/profiles', { headers: { token: localStorage.getItem('token'), email: userStorage.email } })
          .then(res => {
              if (res.status === 200) {
                  setUser(userStorage);
                  setTodos(res.data.todos);
              }
          })
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="bg-white w-1/3 mt-10 rounded-lg">
          <div className="flex items-center justify-center pt-10 flex-col">
            <img src="https://i.pinimg.com/originals/a8/bc/90/a8bc90ea196737604770aaf9c2d56a51.jpg" alt="" className="rounded-full w-32" />
            <h1 className="text-gray-800 font-semibold text-xl mt-5">{user.username}</h1>
            <h1 className="text-gray-500 text-sm">Ha Noi, Viet Nam</h1>
            <h1 className="text-gray-500 text-sm p-2 text-center">
              Email: {user.email}
            </h1>
            <h1 className="text-gray-500 text-sm p-2 text-center">
              Total todos: {todos.length}
            </h1>
          </div>
          <div className="flex justify-between p-4">
            <div>
              <h1 className="text-xs uppercase text-gray-500">Membership</h1>
              <h1 className="text-xs text-yellow-500">Gold Member</h1>
            </div>
            <div>
              <button className="text-xs text-green-300 border-2 py-1 px-2 border-green-300">Renew</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;