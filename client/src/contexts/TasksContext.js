import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { getRequest, putRequest, deleteRequest } from "../utils";
import { useNavigate } from "react-router-dom";

const TasksContext = createContext();

const reducer = (tasks, action) => {
    switch (action.type) {
        case "set_tasks": {
            return action.tasks;
        }
        case "add_task": {
            return [...tasks, action.newTask];
        }
        case "edit_task": {
            const newTasks = [...tasks];
            newTasks[action.idx] = action.task;
            return newTasks;
        }
        case "remove_task": {
            return tasks.filter(({ id }) => id !== action.taskId);
        }
        case "move_task": {
            const { dragTask, dragIdx, hoverTask, hoverIdx } = action;
            const reorderedTasks = [...tasks];

            // swap two tasks
            reorderedTasks[dragIdx] = hoverTask;
            reorderedTasks[hoverIdx] = dragTask; 
            return reorderedTasks;
        }
        default: {
            throw new Error(`Unknown action: ${action.type}`);
        }
    }
};

export const useTasksContext = () => {
    const obj = useContext(TasksContext);

    if (!obj) {
        throw new Error("useTasksContext must be used within TasksProvider");
    }
    
    return obj;
}

export const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(reducer, []);
    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async searchString => {
        const res = await getRequest(`/api/tasks${searchString ? "?search=" + searchString : ""}`);
        if (res.ok) {
            const tasks = await res.json();
            dispatch({ type: "set_tasks", tasks });
        }
        else {
            navigate("/login", { replace: true });
        }
    };

    const addTask = task => dispatch({ type: "add_task", newTask: task });
    
    const completeTask = ({ target }, task, idx) => {
        const newTask = { ...task, isCompleted: target.checked };
        dispatch({ type: "edit_task", task: newTask, idx });
    };

    const editTask = ({ target }, task, idx) => {
        const newTask = { ...task, name: target.value };
        dispatch({ type: "edit_task", task: newTask, idx});
    };
    
    const moveTask = (dragTask, dragIdx, hoverTask, hoverIdx) => {
        const newDragTask = { ...dragTask, priority: hoverTask.priority }
        const newHoverTask = { ...hoverTask, priority: dragTask.priority };
        dispatch({ type: "move_task", dragTask: newDragTask, dragIdx, hoverTask: newHoverTask, hoverIdx });
    };

    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteRequest(`/api/tasks/${id}`);
            dispatch({ type: "remove_task", taskId: id });
        }
    };

    const contextValue = useMemo(() => ({ tasks, getTasks, addTask, completeTask, editTask, moveTask, deleteTask }), [tasks]);

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    )
}