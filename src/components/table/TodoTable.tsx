import React, { useRef, useState } from 'react';
import TableRow from './TableRow';
import ViewModal from '../modals/ViewModal';
import EditModal from '../modals/EditModal';
import { TodoListType, TodoType } from '../types/hookTypes';
import { subStr } from '../../functions/functions';

type TodoTableProps = {
    displayMessage: (status: boolean, str?: string) => void,
    setTodoList: (value: React.SetStateAction<TodoListType>) => void,
    todoList: TodoListType
}

const TodoTable = ({ displayMessage, todoList, setTodoList }: TodoTableProps) => {

    const TodoNotFount = () => {
        return (<tr><td colSpan={4} style={{ textAlign: "center" }}>Todo not found!</td></tr>);
    }

    const [dialogContent, setDialogContent] = useState<React.ReactNode>();
    const dialogRef = useRef<HTMLDialogElement>(null);

    function toggleDialog() {
        if (!dialogRef.current) {
            return;
        }
        dialogRef.current.hasAttribute("open") ? dialogRef.current.close() : dialogRef.current.showModal()
    }

    function getId(event: React.MouseEvent<HTMLButtonElement>): number {
        const tr = event.currentTarget.parentNode?.parentNode as HTMLTableRowElement;
        const id = tr.dataset.id;
        if (id === undefined) throw Error("id no found!");
        return Number.parseInt(id);
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
        if (confirm("Are you sure you want to delete this Todo?")) {
            const id = getId(event);
            let data = todoList;
            const todoTitle = todoList[id].title;
            data.splice(id, 1);

            setTodoList(data);
            displayMessage(true,`'${subStr(todoTitle)}' Todo deleted`);
        } else {
            displayMessage(false);
        }
    };

    const updateTodo = (todo: TodoType, id: number): void => {
        let data = todoList;
        data[id] = {
            title: todo.title,
            description: todo.description
        };
        setTodoList(data);
        displayMessage(true, "Todo updated");
        toggleDialog();
    };

    function handleEdit(event: React.MouseEvent<HTMLButtonElement>) {
        let id = getId(event);
        let todo = todoList[id];
        displayMessage(false);
        let dialogData = {
            title: todo.title,
            description: todo.description
        };
        setDialogContent(<EditModal key={id} toggleDialog={toggleDialog} updateTodo={updateTodo} dialogData={dialogData} id={id} />)
        toggleDialog();
    };

    function handleView(event: React.MouseEvent<HTMLButtonElement>): void {
        let id = getId(event);
        const todo = todoList[id];
        displayMessage(false);
        let dialogData = {
            title: todo.title,
            description: todo.description
        };
        setDialogContent(<ViewModal key={id} toggleDialog={toggleDialog} dialogData={dialogData} />);
        toggleDialog();
    };

    return (
        <>
            <table className="todo-table">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='todo-list'>
                    {todoList.length > 0 ? (todoList.map((todo, index) =>
                        <TableRow key={index} index={index} todo={todo} handleDelete={handleDelete} handleView={handleView} handleEdit={handleEdit} />
                    )) : <TodoNotFount />}
                </tbody>
            </table>
            <dialog ref={dialogRef}>
                {dialogContent}
            </dialog>
        </>
    );
}

export default TodoTable;
