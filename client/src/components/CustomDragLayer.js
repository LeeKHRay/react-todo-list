import { useDragLayer } from "react-dnd"
import { ItemTypes } from "../utils";
import { DraggableTaskPreview } from ".";

const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
};

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }

    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
    return {
        transform,
        WebkitTransform: transform
    };
}

export const CustomDragLayer = () => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));

    const renderItem = () => {
        switch (itemType) {
            case ItemTypes.TASK:
                return <DraggableTaskPreview task={item.task} />;
            default:
                return null;
        }
    }

    return (
        isDragging ?
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {renderItem()}
            </div>
        </div> :
        null
    )
}