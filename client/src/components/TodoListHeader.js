import { Badge, SearchBar } from "../components";
import styles from "./TodoListHeader.module.css";

export const TodoListHeader = ({ tasks }) => {
    const completedTaskNum = tasks.reduce((total, task) => task.isDone ? total + 1 : total, 0);

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