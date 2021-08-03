import React from 'react'
import { User } from '../../interfaces/todosInterface'
interface PropsUser {
    user: User
}

const UserDetail = ({ user }: PropsUser) => {
    return (
        <tr>
            <td className="border px-8 py-4">{user.username}</td>
            <td className="border px-8 py-4">{user.email}</td>
        </tr>
    )
}

export default UserDetail