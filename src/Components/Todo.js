import React,{useState} from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'



const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const handleEdit = (id) => {          // Function to handle editing a todo
        const todoToEdit = todos.find((todo) => todo.id === id);
        setEdit({ id, value: todoToEdit.text });
    };

    const submitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({ id: null, value: '' });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}></TodoForm>;
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)} style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>
                {todo.text}
            </div>
            <div className='icons'>
                <RiCloseCircleLine className='delete-icon' onClick={() => removeTodo(todo.id)} />
                <TiEdit className='update-icon' onClick={() => handleEdit(todo.id)} />
                <input type="checkbox" checked={todo.isComplete} onChange={() => completeTodo(todo.id)} />  // By clicking on the checkbox the completed tasks are marked
            </div>
        </div>
    ));
};

export default Todo;