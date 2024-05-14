import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    // Load tasks from local storage when the todo is added
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    // Save todos to local storage whenever there is a change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    // Function to add a new todo
    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodo = [todo, ...todos];
        setTodos(newTodo);
    };

    const removeTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const updateTodo = (todoId, newValue) => {    // Function to update a todo
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos((prev) =>
            prev.map((item) => (item.id === todoId ? newValue : item))
        );
    };

    const completeTodo = (id) => {    // Function to mark a todo as complete
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isComplete: !todo.isComplete };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <div className='layout'>
                <h1>What's the Plan for today?</h1>
                <TodoForm onSubmit={addTodo}></TodoForm>
                <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}></Todo>
            </div>
        </div>
    );
};

export default TodoList;