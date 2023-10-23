import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export const Task = ({ task, onComplete, onEdit, onDelete }) => {
    const { task: content, isDone } = task;

    return (
        <InputGroup className="my-1">
            <span className="input-group-text border-dark">
                <div>
                    <input type="checkbox" className="form-check-input border-dark" checked={isDone} onChange={(e) => onComplete(e, task)} />
                </div>
            </span>
            <Form.Control type="text" className="border-dark" value={content} onChange={(e) => onEdit(e, task)} placeholder="Enter your task" />
            <Button variant="danger" className="border-dark" onClick={() => onDelete(task.id)}>
                <i className="bi-trash"></i>
            </Button>
        </InputGroup>
    );
}