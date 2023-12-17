import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task, TodoListHeader, CustomDragLayer, AddNewTaskBar } from "../components";
import { getRequest, putRequest, deleteRequest } from "../utils";

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
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
            const res = await getRequest("/api/tasks");
            if (res.ok) {
                const tasks = await res.json();
                dispatch({ type: "set_tasks", tasks });
            }
            else {
                navigate("/login", { replace: true });
            }
        })();
    }, []);

    const handleAddTask = task => dispatch({ type: "add_task", newTask: task });

    const handleComplete = useCallback(({ target }, task) => {
        dispatch({ type: "edit_task", task: { ...task, isDone: target.checked }});
    }, []);

    const handleEdit = useCallback(({ target }, task) => dispatch({ type: "edit_task", task: { ...task, name: target.value }}), []);

    const handleDelete = useCallback((id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteRequest(`/api/tasks/${id}`);
            dispatch({ type: "remove_task", taskId: id });
        }
    }, []);

    const handleMove = useCallback((dragIdx, hoverIdx) => dispatch({ type: "move_task", dragIdx, hoverIdx }), []);
    
    return (
        <>
            <TodoListHeader tasks={tasks} />
            
            <DndProvider backend={HTML5Backend}>
                <div style={{padding: "10px", backgroundColor: "#c6f7da", border: "1px solid #20c997", borderRadius: "0.375rem", marginBottom: 70}}>
                    {
                        tasks.map((task, i) => <Task key={task.id} task={task} onComplete={handleComplete} onEdit={handleEdit} onDelete={handleDelete} onMove={handleMove} />)
                    }
                </div>
                <CustomDragLayer />
            </DndProvider>

            <div style={{width: "100%", position: "fixed", left: 0, bottom:0, padding: "0", zIndex: 100}}>
                <Container>
                    <div style={{padding: "0 10px",backgroundColor: "yellowgreen", border: "1px solid #20c997", borderRadius: "0.375rem 0.375rem 0 0"}}>
                        <AddNewTaskInput onAddTask={handleAddTask} />
                    </div>
                </Container>
            </div>
        </>
    )
}