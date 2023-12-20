import { TodoListHeader, TodoListContent, TodoListFooter } from "../components";
import { TasksProvider } from "../contexts/TasksContext";

export const TodoList = () => {    
    return (
        <TasksProvider>
            <TodoListHeader />
            <TodoListContent />
            <TodoListFooter />
        </TasksProvider>
    )
}