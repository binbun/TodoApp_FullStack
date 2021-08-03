import axios from "axios";
import TodoItem from "./TodoItem";
import { Todo } from '../../interfaces/todosInterface'

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}
const TodoList = ({todos, setTodos}: TodoListProps) => {
  
  const markCompleted = (todo: Todo) => {
    axios.delete(`/todo/${todo._id}`, {headers: { token: localStorage.getItem('token')}})
      .then(res => {
        if (res.status === 200) {
          let _todos = todos;
          setTodos(_todos.filter(todo => res.data.todo._id !== todo._id));
        }
      });
  }

  const editCompleted = (todo: Todo) => {
    
    axios.put(`/todo/${todo._id}`, todo, {headers: { token: localStorage.getItem('token')}})
      .then(res => {
        if (res.status === 200) {
          setTodos(res.data.todos);
        }
      });
  }

  return(
    <>
      {todos.map((todo) => (
        <TodoItem todo={todo} handleOnDoneClick={markCompleted} handleOnEditClick={editCompleted} key={todo._id}/>
      ))}
    </>
  )
}

export default TodoList;