import { TodoType } from "../types/hookTypes";

type ViewModalProps = {
    toggleDialog(): void,
    dialogData: TodoType,
}
const ViewModal = ({ toggleDialog, dialogData }: ViewModalProps) => {
    return (
        <div>
            <div id="viewModal" className="form">
                <h3>Your To-Do </h3>
                <b>Title</b>
                <div>{dialogData.title}</div>
                <b>Description</b>
                <div style={{ whiteSpace: 'pre-wrap' }}>{dialogData.description}</div>
                <button type="button" onClick={toggleDialog} >Close</button>
            </div>
        </div >
    );
}

export default ViewModal;