'use client';
import { useContext } from 'react';
import { useDrag } from '@/hooks/useDrag';
import { Draggable } from '@/components/Draggable';
import { TaskMini } from '@/components/TaskMini';
import { Column, ColumnName, DeskContainer } from '@/components/StyledComponents';
import { DraggableImage } from '@/components/DraggableImage';
import { DashboardContext } from '@/components/DashboardProvider';

export function Desk() {
	const { filteredTasks: tasks, columnConfig } = useContext(DashboardContext);
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

	const renderMapper = (status: string) => (
		<Column key={status} id={status}>
			<ColumnName component="span">{status}</ColumnName>
			{config
				.filter(card => card.status === status)
				.map(({ title, description, id, assignee: { email, username } }) => {
					const cardId = `${status}:${id}`;
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
								<TaskMini
									title={title}
									description={description}
									id={id}
									email={email}
									username={username}
								/>
							)}
						</Draggable>
					);
				})}
		</Column>
	);

	return <DeskContainer ref={ref}>{columnConfig.map(renderMapper)}</DeskContainer>;
}
