import { useRef } from "react";
import { TodoListType } from "./types/hookTypes";
import { getLists, subStr } from "../functions/functions";

type InputFieldProps = {
    displayMessage: (status: boolean, str?: string) => void,
    setTodoList: (value: React.SetStateAction<TodoListType>) => void
}

const InputField = ({ displayMessage, setTodoList }: InputFieldProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const addTodo = () => {
        const title = titleRef.current;
        const description = descriptionRef.current;

        if (!title || !description) return;

        title.value = title?.value.trim() || "";

        // check inputs are empty or not
        if (title.value == "" || description.value.trim() == "") {
            displayMessage(false);
            alert("All fields are required.");
            return;
        }

        let data: TodoListType = getLists();
        let inputData = {
            title: title.value,
            description: description.value
        };

        setTodoList([...data, inputData]);
        displayMessage(true, `'${subStr(title.value)}' Todo added`);

        title.value = "";
        description.value = "";
    }

    return (
        <div className="todo">
            <div className="form">
                <h3>Add Your Todo</h3>
                <input type="text" className="input" placeholder="Title" ref={titleRef} />
                <textarea className="input" placeholder="Description" ref={descriptionRef} ></textarea>
                <button type="button" onClick={addTodo}>Add Todo</button>
            </div>
        </div>
    );
}

export default InputField;
