import { useEffect, useState } from 'react';
import InputField from './InputField';
import MessageBox from './MessageBox';
import TodoTable from './table/TodoTable';
import { TodoListType } from './types/hookTypes';
import { getLists } from '../functions/functions';

function Todo() {
    const [message, setMessage] = useState({
        display: false,
        message: ""
    });

    const displayMessage = (status: boolean, str = "") => {
        setMessage({
            display: status,
            message: str
        });
    };

    const [todoList, setTodoList] = useState<TodoListType>(getLists());

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <>
            <MessageBox message={message} />
            <main>
                <InputField displayMessage={displayMessage} setTodoList={setTodoList} />
                <TodoTable displayMessage={displayMessage} todoList={todoList} setTodoList={setTodoList} />
            </main>
        </>
    );
}
export default Todo;