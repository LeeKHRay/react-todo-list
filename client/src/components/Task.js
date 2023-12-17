import { memo, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend'
import { ItemTypes } from '../utils';
import styles from './Task.module.css';

export const Task = memo(({ task, onComplete, onEdit, onDelete, onMove }) => {
    const { id, name, isDone } = task;
    const dragRef = useRef(null);
    
    const [{ opacity }, drag, dragPreview] = useDrag({
        type: ItemTypes.TASK,
        item: () => ({ task }),
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? "opacity-0" : "opacity-100" 
        })
    });

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.TASK,
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        hover: (item, monitor) => {
            if (!dragRef.current) {
                return;
            }

            const dragIdx = item.task.priority - 1;
            const hoverIdx = task.priority - 1;

            if (dragIdx === hoverIdx) {
                return;
            }

            const hoverBoundingRect = dragRef.current?.getBoundingClientRect() // get size of drop area and its position relative to the viewport
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 // get vertical middle
            const clientOffset = monitor.getClientOffset() // get cursor position            
            const hoverClientY = clientOffset.y - hoverBoundingRect.top // get distance from cursor to top of drop area
            
            if (dragIdx < hoverIdx && hoverClientY < hoverMiddleY) { // dragging downwards but above middle
                return
            }
            
            if (dragIdx > hoverIdx && hoverClientY > hoverMiddleY) { // dragging upwards but below middle
                return
            }

            onMove(dragIdx, hoverIdx) // only swap the tasks when the cursor has crossed half of the items height

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.task.priority = hoverIdx + 1;
        }
    });

    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(dragRef);

    return (
        <InputGroup className={`${styles.task} ${opacity}`} data-handler-id={handlerId} ref={drop}>
            <span className={`input-group-text border-success p-1 ${styles.dragHandle}`} ref={dragRef}>
                <i className="bi bi-grip-vertical" />
            </span>
            <span className="input-group-text border-success">
                <div>
                    <input type="checkbox" className="form-check-input border-success" checked={isDone} onChange={(e) => onComplete(e, task)} />
                </div>
            </span>
            <Form.Control 
                type="text" 
                className={`border-success ${isDone ? styles.done : ""}`}
                value={name} 
                onChange={(e) => onEdit(e, task)} 
                placeholder="Enter your task" 
                readOnly={isDone}
            />
            <Button variant="danger" className="border-success" onClick={() => onDelete(id)}>
                <i className="bi-trash" />
            </Button>
        </InputGroup>
    );
});