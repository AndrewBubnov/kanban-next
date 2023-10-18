'use client';
import { useDrag } from '@/hooks/useDrag';
import { Draggable } from '@/components/Draggable/Draggable';
import { TaskMini } from '@/components/TaskMini/TaskMini';
import { ColumnNameDTO } from '@/constants';
import { DeskProps, Status } from '@/types';
import { Column, ColumnName, DeskContainer } from '@/components/StyledComponents';

export function Desk({ tasks, columns }: DeskProps) {
	const {
		positions,
		config,
		draggedDX,
		draggedDY,
		ref,
		draggedId,
		dragStartHandler,
		dragHandler,
		dropHandler,
		configUpdated,
	} = useDrag(tasks);

	const renderMapper = (status: Status) => (
		<Column key={status} id={status}>
			<ColumnName component="span">{ColumnNameDTO[status]}</ColumnName>
			{config
				.filter(card => card.status === status)
				.map(({ title, description, id }) => {
					const cardId = `${status}-${id}`;
					const isDragged = id === draggedId;
					return (
						<Draggable
							key={cardId}
							onDragStart={dragStartHandler(id)}
							onDrag={dragHandler}
							onDrop={dropHandler}
							isDragged={isDragged}
							dX={isDragged ? draggedDX : positions[id]?.dX}
							dY={isDragged ? draggedDY : positions[id]?.dY}
							id={cardId}
							configUpdated={configUpdated}
						>
							<TaskMini title={title} description={description} id={id} />
						</Draggable>
					);
				})}
		</Column>
	);

	return <DeskContainer ref={ref}>{columns.map(renderMapper)}</DeskContainer>;
}
