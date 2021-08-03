import React from 'react'
import axios from 'axios'
import { User } from '../interfaces/todosInterface';
import UserDetail from '../components/user/UserDetail';
import Navbar from '../components/Navbar';

const Admin = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    React.useEffect(() => {
        axios.get('/admin/profiles', { headers: { token: localStorage.getItem('token') } })
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data.users);
                }
            })
    }, [])

    return (
        <>
            <Navbar />
            <table className="shadow-lg bg-white w-full pt-12 mx-auto">
                <tbody>
                    <tr>
                        <th className="bg-blue-100 border text-left px-8 py-4">Username</th>
                        <th className="bg-blue-100 border text-left px-8 py-4">Email</th>
                    </tr>
                    {users.map(user => (!user.isAdmin &&
                        <UserDetail key={user._id} user={user} />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Admin
