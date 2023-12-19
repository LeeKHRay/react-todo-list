import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task, CustomDragLayer } from "../components";
import { useTasksContext } from "../contexts";

export const TodoListContent = () => {
    const { tasks } = useTasksContext();

    return (
        tasks.length > 0 && 
        <DndProvider backend={HTML5Backend}>
            <div style={{padding: "10px", backgroundColor: "#c6f7da", border: "1px solid #20c997", borderRadius: "0.375rem", marginBottom: 70}}>
                {
                    tasks.map((task, idx) =>
                        <Task 
                            key={task.id} 
                            task={task} 
                            idx={idx} 
                        />
                    )
                }
            </div>
            <CustomDragLayer />
        </DndProvider>
    );
};