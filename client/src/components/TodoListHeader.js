import { Badge, SearchBar } from "../components";
import { useTasksContext } from "../contexts/TasksContext";
import styles from "./TodoListHeader.module.css";

export const TodoListHeader = () => {
    const { tasks } = useTasksContext();
    
    const completedTaskNum = tasks.reduce((total, task) => task.isCompleted ? total + 1 : total, 0);

    return (
        <div className={styles.header}>
            <div className={styles.flex}>
                <h1 className="m-0">Tasks</h1>
                <Badge text="Completed" number={completedTaskNum} />
                <Badge text="Remaining" number={tasks.length - completedTaskNum} />
                <Badge text="Total" number={tasks.length} />
            </div>
            <SearchBar />
        </div>
    );
};