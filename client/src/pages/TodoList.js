import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect, useReducer, useCallback } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Task, CustomDragLayer } from "../components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getRequest, postRequest, putRequest, deleteRequest } from "../utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend  } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

const reducer = (tasks, action) => {
    switch (action.type) {
        case "set_tasks": 
            return action.tasks;
        case "add_task":
            return [
                ...tasks,
                action.newTask
            ];
        case "edit_task":
            const newTasks = [...tasks];
            newTasks[newTasks.findIndex(({ id }) => id === action.task.id)] = action.task;
            return newTasks;
        case "remove_task":
            return tasks.filter(({ id }) => id !== action.taskId);
        case "move_task":
            const { dragIdx, hoverIdx } = action;
            const reorderedTasks = [...tasks];
            const dragTask = { ...reorderedTasks[dragIdx], priority: hoverIdx + 1 };
            const hoverTask = { ...reorderedTasks[hoverIdx], priority: dragIdx + 1 };
            [reorderedTasks[dragIdx], reorderedTasks[hoverIdx]] = [hoverTask, dragTask]; // swap two tasks
            return reorderedTasks;
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

export const TodoList = () => {
    const [tasks, dispatch] = useReducer(reducer, []);
    const [newTask, setNewTask] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
            const res = await getRequest("/api/tasks");
            if (res.ok) {
                const taskObjs = await res.json();
                dispatch({ type: "set_tasks", tasks: taskObjs });
            }
            else {
                navigate("/login", { replace: true });
            }
        })();
    }, []);

    const handleNewTaskChange = ({ target }) => {
        setNewTask(target.value);
    };

    const handleAddTask = async () => {
        if (newTask) {
            const res = await postRequest("/api/tasks", { task: newTask });
            const taskObj = await res.json();
            
            dispatch({ type: "add_task", newTask: taskObj });
            setNewTask("");
        }
        else {
            alert("Please enter your new task");
        }
    };

    const handleComplete = useCallback(({ target }, task) => {
        dispatch({ type: "edit_task", task: { ...task, isDone: target.checked }});
    }, []);

    const handleEdit = useCallback(({ target }, task) => {
        dispatch({ type: "edit_task", task: { ...task, task: target.value }});
    }, []);

    const handleDelete = useCallback((id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteRequest(`/api/tasks/${id}`);
            dispatch({ type: "remove_task", taskId: id });
        }
    }, []);

    const handleMove = useCallback((dragIdx, hoverIdx) => {
        dispatch({ type: "move_task", dragIdx, hoverIdx });
    }, []);

    const handleSave = async () => {
        if (tasks.some(({ task }) => task === "")) {
            alert("Please enter all your tasks");
        }
        else {
            await putRequest("/api/tasks", tasks);
        }
    };
    
    return (
        <>
            <h1>Tasks</h1>
            <InputGroup className="mb-3">
                <Form.Control className="border-primary" type="text" placeholder="Add new task" value={newTask} onChange={handleNewTaskChange} />
                <Button variant="outline-primary" onClick={handleAddTask}>
                    <i className="bi-plus-lg"></i>
                </Button>
            </InputGroup>
            
            <DndProvider backend={HTML5Backend}>
                <ListGroup variant="flush">
                    {
                        tasks.map((task, i) => <ListGroup.Item key={task.id} as={Task} task={task} onComplete={handleComplete} onEdit={handleEdit} onDelete={handleDelete} onMove={handleMove} />)
                    }
                </ListGroup>
                <CustomDragLayer />
            </DndProvider>

            {tasks.length > 0 && <Button className="d-block mt-3 mx-auto" onClick={handleSave}>Save</Button>}
        </>
    )
}