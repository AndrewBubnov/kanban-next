'use client';
import { useContext } from 'react';
import { useDrag } from '@/hooks/useDrag';
import { Draggable } from '@/components/Draggable';
import { TaskMini } from '@/components/TaskMini';
import { Column, ColumnName, DeskContainer, HeroContainer, Loader } from '@/components/StyledComponents';
import { DraggableImage } from '@/components/DraggableImage';
import { DashboardContext } from '@/components/DashboardProvider';
import { ColumnType } from '@/types';

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

	const renderMapper = (column: ColumnType) => (
		<Column key={column.name} id={column.name}>
			<ColumnName component="span">{column.name}</ColumnName>
			{config
				.filter(card => card.status === column.name)
				.map(({ title, description, id, assignee: { email, username } }) => {
					const cardId = `${column.name}:${id}`;
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

	return (
		<DeskContainer ref={ref}>
			{tasks.length ? (
				columnConfig.filter(el => el.shown).map(renderMapper)
			) : (
				<HeroContainer>
					<Loader />
				</HeroContainer>
			)}
		</DeskContainer>
	);
}
