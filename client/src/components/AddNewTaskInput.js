import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { postRequest } from "../utils";

export const AddNewTaskInput = ({onAddTask: addTask}) => {
    const [taskName, setTaskName] = useState("");

    const handleChange = ({ target }) => {
        setTaskName(target.value);
    };

    const handleAddTask = async () => {
        if (!taskName) {
            alert("Please enter your new task");
            return;
        }

        const res = await postRequest("/api/tasks", { taskName });
        const task = await res.json();
        
        addTask(task);
        setTaskName("");
    };
    
    return (
        <InputGroup>
            <Form.Control className="border-warning" type="text" placeholder="Add new task" value={taskName} onChange={handleChange} />
            <Button variant="outline-warning" onClick={handleAddTask}>
                <i className="bi-plus-lg"></i>
            </Button>
        </InputGroup>
    );
};