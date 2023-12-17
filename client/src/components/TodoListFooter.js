import Container from "react-bootstrap/Container";
import { AddNewTaskInput } from "./AddNewTaskInput";
import styles from "./TodoListFooter.module.css";

export const TodoListFooter = ({ onAddTask }) => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.footer}>
                    <AddNewTaskInput onAddTask={onAddTask} />
                </div>
            </Container>
        </div>
    );
}