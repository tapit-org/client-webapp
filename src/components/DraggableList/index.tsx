import * as React from "react";
import DraggableListItem from "./DraggableListItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

export type Item = {
	id: string;
	primary: string;
	secondary: string;
};

export type DraggableListProps = {
	items: any;
	setItems: any;
	children: any;
	idKey: string;
};

const DraggableList = React.memo(
	({ items, setItems, children, idKey }: DraggableListProps) => {
		const reorder = (
			list: Item[],
			startIndex: number,
			endIndex: number,
		) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);

			return result;
		};
		const onDragEnd = ({ destination, source }: DropResult) => {
			// dropped outside the list
			if (!destination) return;
			const newItems = reorder(items, source.index, destination.index);
			setItems(newItems);
		};
		return (
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable-list">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{children.map((child, index) => (
								<DraggableListItem
									child={child}
									id={items[index][idKey]}
									index={index}
									key={items[index][idKey]}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	},
);

export default DraggableList;
