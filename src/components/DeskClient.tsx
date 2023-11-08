'use client';
import { useDrag } from '@/hooks/useDrag';
import { Draggable } from '@/components/Draggable';
import { TaskMini } from '@/components/TaskMini';
import { Column, ColumnName, DeskContainer, HeroContainer } from '@/components/StyledComponents';
import { DraggableImage } from '@/components/DraggableImage';
import { ColumnType, DeskClientProps } from '@/types';

export function DeskClient({ tasks, columnConfig }: DeskClientProps) {
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
		isLoading,
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
							isLoading={isLoading}
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
				<HeroContainer>No tasks so far</HeroContainer>
			)}
		</DeskContainer>
	);
}
