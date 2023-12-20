import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useTasksContext } from "../contexts/TasksContext";
import { postRequest } from "../utils";

export const AddNewTaskInput = () => {
    const [taskName, setTaskName] = useState("");
    const { addTask } = useTasksContext();

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

    const handleKeyAddTask = ({ key }) => {
        if (key === 'Enter') { // press "Enter" to add new task
            handleAddTask();
        }
    };
    
    return (
        <InputGroup>
            <Form.Control className="border-warning" type="text" placeholder="Add new task" value={taskName} onChange={handleChange} onKeyDown={handleKeyAddTask} />
            <Button variant="outline-warning" onClick={handleAddTask}>
                <i className="bi-plus-lg"></i>
            </Button>
        </InputGroup>
    );
};