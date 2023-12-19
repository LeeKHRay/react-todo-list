import "bootstrap-icons/font/bootstrap-icons.css";
import { TodoListHeader, TodoListContent, TodoListFooter } from "../components";
import { TasksProvider } from "../contexts";

export const TodoList = () => {
    return (
        <TasksProvider>
            <TodoListHeader />
            <TodoListContent />
            <TodoListFooter />
        </TasksProvider>
    )
}