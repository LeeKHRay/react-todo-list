import Container from "react-bootstrap/Container";
import { AddNewTaskInput } from "./AddNewTaskInput";
import styles from "./TodoListFooter.module.css";

export const TodoListFooter = ({ onAdd }) => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.footer}>
                    <AddNewTaskInput onAdd={onAdd} />
                </div>
            </Container>
        </div>
    );
}