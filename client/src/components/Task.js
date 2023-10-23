import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import styles from './Task.module.css';

export const Task = ({ task, onComplete, onEdit, onDelete }) => {
    const { id, task: content, isDone } = task;

    return (
        <InputGroup className="my-1">
            <span className="input-group-text border-dark">
                <div>
                    <input type="checkbox" className="form-check-input border-dark" checked={isDone} onChange={(e) => onComplete(e, task)} />
                </div>
            </span>
            <Form.Control 
                type="text" 
                className={`border-dark ${isDone ? styles.done : ""}`}
                value={content} 
                onChange={(e) => onEdit(e, task)} 
                placeholder="Enter your task" 
                readOnly={isDone}
            />
            <Button variant="danger" className="border-dark" onClick={() => onDelete(id)}>
                <i className="bi-trash"></i>
            </Button>
        </InputGroup>
    );
}