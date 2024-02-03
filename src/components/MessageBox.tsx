import { MessageType } from "./types/hookTypes";

type MessageProps = {
    message: MessageType
}

const MessageBox = ({ message }: MessageProps) => {
    return (
        <div className="messageBox">
            {message.display && <div className="message">{message.message}</div>}
        </div>
    );
}

export default MessageBox;