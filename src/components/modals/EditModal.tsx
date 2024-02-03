import { useState } from "react";
import { TodoType } from "../types/hookTypes";

type EditModalProps = {
    toggleDialog(): void,
    dialogData: TodoType,
    id: number,
    updateTodo: (data: TodoType, id: number) => void,
}

const EditModal = ({ toggleDialog, dialogData, id, updateTodo }: EditModalProps) => {
    const [data, setData] = useState(dialogData);

    const onClick = (title: string, description: string) => {
        setData({
            title: title,
            description: description
        });
    }

    const handleUpdate = () => {
        let newTitle = data.title.trim();
        let newDescription = data.description.trim();
        if (newTitle === "" || newDescription === "") {
            alert("All fields are required.");
            return;
        }
        updateTodo(data, id);
    }

    return (
        <div>
            <div className="form">
                <h3>Edit Your To-Do </h3>
                <input type="hidden" id="eid" value={id} />
                <input type="text" placeholder="Title" className="input" value={data.title} onChange={(e) => onClick(e.target.value, data.description)} />
                <textarea className="input" placeholder="Description" value={data.description} onChange={(e) => onClick(data.title, e.target.value)}></textarea>
                <button type="button" onClick={handleUpdate}>Update To Do</button>
                <button type="button" onClick={toggleDialog} >Close</button>
            </div>
        </div>
    )
}

export default EditModal;