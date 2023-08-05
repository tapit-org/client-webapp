import { ListItem } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

export type DraggableListItemProps = {
    id: string,
    child: any;
    index: number;
};

const DraggableListItem = ({ child, id, index }: DraggableListItemProps) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    sx={{
                        padding: 0
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {child}
                </ListItem>
            )}
        </Draggable>
    );
};

export default DraggableListItem;
