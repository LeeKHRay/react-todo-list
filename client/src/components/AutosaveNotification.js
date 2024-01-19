import Alert from 'react-bootstrap/Alert';
import styles from "./AutosaveNotification.module.css";
import { useTasksIsSavedContext } from '../contexts/TasksContext';

export const AutosaveNotification = () => {
    const { isSaved } = useTasksIsSavedContext();

    return (
        isSaved &&
        <div className={styles.notification}>
            <Alert variant="success"><strong>Tasks saved</strong></Alert>
        </div>
    )
}