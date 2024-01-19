import { AutosaveNotification, TodoListHeader, TodoListContent, TodoListFooter } from "../components";
import { TasksProvider } from "../contexts/TasksContext";

export const TodoList = () => {    
    return (
        <TasksProvider>
            <AutosaveNotification />
            <TodoListHeader />
            <TodoListContent />
            <TodoListFooter />
        </TasksProvider>
    )
}