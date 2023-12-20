import { createContext, useContext, useReducer, useEffect, useMemo, useRef } from "react";
import { useDebounce } from "../hooks";
import { getRequest, putRequest, deleteRequest } from "../utils";
import { useNavigate } from "react-router-dom";

const TasksContext = createContext();

export const useTasksContext = () => {
    const obj = useContext(TasksContext);

    if (!obj) {
        throw new Error("useTasksContext must be used within TasksProvider");
    }
    
    return obj;
}

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
            return tasks.filter(({ id }) => id !== action.id);
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

export const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(reducer, []);
    const editedTasks = useRef({});
    const navigate = useNavigate();

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
        const editedTask = { ...task, isCompleted: target.checked };
        dispatch({ type: "edit_task", task: editedTask, idx });

        const { id, name, isCompleted, priority } = editedTask;
        if (editedTasks.current[id]) {
            const { origName, origIsCompleted, origPriority } = editedTasks.current[id];

            // check if the task is the same as before
            if (name === origName && isCompleted === origIsCompleted && priority === origPriority) {
                // remove the unmodified task to avoid sending unnecessary data to server
                delete editedTasks.current[id];
            }
            else {
                editedTasks.current[id].isCompleted = isCompleted;
            }

            return;
        }

        editedTasks.current[id] = { ...editedTask, origName: name, origIsCompleted: isCompleted, origPriority: priority };
    };

    const editTask = ({ target }, task, idx) => {
        const editedTask = { ...task, name: target.value };
        dispatch({ type: "edit_task", task: editedTask, idx});

        const { id, name, isCompleted, priority } = editedTask;
        if (editedTasks.current[id]) {
            const { origName, origIsCompleted, origPriority } = editedTasks.current[id];

            if (name === "" || (name === origName && isCompleted === origIsCompleted && priority === origPriority)) {
                // remove the empty/unmodified task to avoid sending unnecessary data to server
                delete editedTasks.current[id];
            }
            else {
                editedTasks.current[id].name = name;
            }

            return;
        }

        if (name === "") { // don't update empty task
            return;
        }

        editedTasks.current[id] = { ...editedTask, origName: task.name, origIsCompleted: task.isCompleted, origPriority: task.priority };
    };
    
    const moveTask = (dragTask, dragIdx, hoverTask, hoverIdx) => {
        const editedDragTask = { ...dragTask, priority: hoverTask.priority }
        const editedHoverTask = { ...hoverTask, priority: dragTask.priority };
        dispatch({ type: "move_task", dragTask: editedDragTask, dragIdx, hoverTask: editedHoverTask, hoverIdx });

        const { id: dragTaskId } = editedDragTask;
        if (editedTasks.current[dragTaskId]) {
            const { name, isCompleted, priority } = editedDragTask;
            const { origName, origIsCompleted, origPriority } = editedTasks.current[dragTaskId];
            if (name === origName && isCompleted === origIsCompleted && priority === origPriority) { 
                delete editedTasks.current[dragTaskId];
            }
            else {
                editedTasks.current[dragTaskId].priority = editedDragTask.priority;
            }
        }
        else {
            editedTasks.current[dragTaskId] = { ...editedDragTask, origName: dragTask.name, origIsCompleted: dragTask.isCompleted, origPriority: dragTask.priority };
        }

        const { id: hoverTaskId } = editedHoverTask;
        if (editedTasks.current[hoverTaskId]) {
            const { name, isCompleted, priority } = editedHoverTask;
            const { origName, origIsCompleted, origPriority } = editedTasks.current[hoverTaskId];
            if (name === origName && isCompleted === origIsCompleted && priority === origPriority) { 
                delete editedTasks.current[hoverTaskId];
            }
            else {
                editedTasks.current[hoverTaskId].priority = editedHoverTask.priority;
            }
        }
        else {
            editedTasks.current[hoverTaskId] = { ...editedHoverTask, origName: hoverTask.name, origIsCompleted: hoverTask.isCompleted, origPriority: hoverTask.priority };
        }
    };

    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteRequest(`/api/tasks/${id}`);
            dispatch({ type: "remove_task", id });

            delete editedTasks.current[id];
        }
    };

    const saveEditedTasks = async () => {
        const arr = Object.values(editedTasks.current).map(({ origName, origIsCompleted, origPriority, ...task }) => task);
        if (arr.length > 0) {
            await putRequest("/api/tasks", arr);
            editedTasks.current = {};
        }
    };

    useEffect(() => {
        getTasks(); // get tasks in the first render
        window.addEventListener("beforeunload", saveEditedTasks); // save tasks before the browser/tab closes

        return () => {
            saveEditedTasks(); // save tasks before the component unmounts
            window.removeEventListener("beforeunload", saveEditedTasks);
        };
    }, []);

    // autosave
    useDebounce(saveEditedTasks, 1500, [tasks]);

    const contextValue = useMemo(() => ({ tasks, getTasks, addTask, completeTask, editTask, moveTask, deleteTask }), [tasks]);

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    )
}