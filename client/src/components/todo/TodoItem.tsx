import React, { useState } from 'react'
import { Todo } from '../../interfaces/todosInterface'

interface Props {
  todo: Todo,
  handleOnDoneClick: (todo: Todo) => void,
  handleOnEditClick: (todo: Todo) => void
}

const TodoItem: React.FC<Props> = ({ todo, handleOnDoneClick, handleOnEditClick }) => {
  const [title, setTitle] = useState(todo.title)

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value) 
  }

  todo.title = title

  return (
    <div className="border border-gray-400 p-4 rounded-md mb-4 flex justify-between items-center space-x-1  " key={todo._id}>
      <input 
        value={title} 
        className="w-3/4 focus:outline-none focus:ring focus:border-blue-300 resize-none border rounded-md break-words..."
        onChange={handleOnChange}/>
      <input type="button" className="w-1/8 py-2 px-3 bg-green-400 text-white rounded-md cursor-pointer " value="EDIT" onClick={() => handleOnEditClick(todo)} />
      <input type="button" className="w-1/8 py-2 px-3 bg-green-400 text-white rounded-md cursor-pointer " value="DELETE" onClick={() => handleOnDoneClick(todo)} />
    </div>
  )
}
export default TodoItem
