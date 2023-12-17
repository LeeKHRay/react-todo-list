import { memo } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import styles from './Task.module.css';

// use memo to avoid rerendering DraggableTaskPreview when dragging
export const DraggableTaskPreview = memo(({ task: { name, isDone }}) => {
    return (
        <Container className="m-0">
            <div style={{padding: "0 10px"}}>
                <InputGroup>
                    <span className="input-group-text border-success p-1">
                        <i className="bi bi-grip-vertical" style={{ fontSize: "1.5rem" }} />
                    </span>
                    <span className="input-group-text border-success">
                        <div>
                            <input type="checkbox" className="form-check-input border-success" checked={isDone} readOnly />
                        </div>
                    </span>
                    <Form.Control 
                        type="text" 
                        className={`border-success ${isDone ? styles.done : ""}`}
                        value={name} 
                        placeholder="Enter your task" 
                        readOnly
                    />
                    <Button variant="danger" className="border-success">
                        <i className="bi-trash" />
                    </Button>
                </InputGroup>
            </div>
        </Container>
    );
});