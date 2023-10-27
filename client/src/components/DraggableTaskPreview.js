import { memo } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import styles from './Task.module.css';

// use memo to avoid rerendering DraggableTaskPreview when dragging
export const DraggableTaskPreview = memo(({ task: { task, isDone }}) => {
    return  (
        <Container className="p-0 m-0">
            <InputGroup>
                <span className="input-group-text border-dark p-1">
                    <i className="bi bi-grip-vertical" style={{ fontSize: "1.5rem" }} />
                </span>
                <span className="input-group-text border-dark">
                    <div>
                        <input type="checkbox" className="form-check-input border-dark" checked={isDone} readOnly />
                    </div>
                </span>
                <Form.Control 
                    type="text" 
                    className={`border-dark ${isDone ? styles.done : ""}`}
                    value={task} 
                    placeholder="Enter your task" 
                    readOnly
                />
                <Button variant="danger" className="border-dark">
                    <i className="bi-trash" />
                </Button>
            </InputGroup>
        </Container>
    )
});