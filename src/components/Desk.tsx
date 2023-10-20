'use client';
import { useDrag } from '@/hooks/useDrag';
import { Draggable } from '@/components/Draggable';
import { TaskMini } from '@/components/TaskMini';
import { ColumnNameDTO } from '@/constants';
import { DeskProps, Status } from '@/types';
import { Column, ColumnName, DeskContainer } from '@/components/StyledComponents';
import { DraggableImage } from '@/components/DraggableImage';

export function Desk({ tasks, columns }: DeskProps) {
	const {
		parameters,
		config,
		draggedDX,
		draggedDY,
		ref,
		draggedId,
		dragStartHandler,
		dragHandler,
		dropHandler,
		isConfigUpdated,
	} = useDrag(tasks);

	const renderMapper = (status: Status) => (
		<Column key={status} id={status}>
			<ColumnName component="span">{ColumnNameDTO[status]}</ColumnName>
			{config
				.filter(card => card.status === status)
				.map(({ title, description, id }) => {
					const cardId = `${status}-${id}`;
					const isDragged = id === draggedId;
					const imageParameters = parameters[draggedId];
					return (
						<Draggable
							key={cardId}
							onDragStart={dragStartHandler(id)}
							onDrag={dragHandler}
							onDrop={dropHandler}
							isDragged={isDragged}
							dX={isDragged ? draggedDX : parameters[id]?.dX}
							dY={isDragged ? draggedDY : parameters[id]?.dY}
							id={cardId}
							isConfigUpdated={isConfigUpdated}
						>
							{isDragged && imageParameters ? (
								<DraggableImage imageParameters={imageParameters} />
							) : (
								<TaskMini title={title} description={description} id={id} />
							)}
						</Draggable>
					);
				})}
		</Column>
	);

	return <DeskContainer ref={ref}>{columns.map(renderMapper)}</DeskContainer>;
}
