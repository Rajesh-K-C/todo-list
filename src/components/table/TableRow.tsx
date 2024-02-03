import { subStr } from "../../functions/functions";
import { TodoType } from "../types/hookTypes";

type TableRowProps = {
    index: number,
    todo: TodoType,
    handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleView: (event: React.MouseEvent<HTMLButtonElement>) => void
    handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const TableRow = ({ index, todo, handleDelete, handleView, handleEdit }: TableRowProps) => {

    const titleLength = 20;
    const descriptionLength = 30;
    let title = todo.title;
    let description = todo.description;
    title = subStr(title, titleLength);
    description = subStr(description, descriptionLength);

    // create table row
    return (
        <tr data-id={index}>
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>{description}</td>
            <td className='actions'>
                <button type="button" title="view" onClick={handleView} ><i className="fa-solid fa-eye" ></i></button>
                <button type="button" title="update" onClick={handleEdit} ><i className="fa-regular fa-edit"></i></button>
                <button type="button" title="delete" onClick={handleDelete} ><i className="fa-solid fa-trash"></i></button>
            </td>
        </tr >
    );
}

export default TableRow;
